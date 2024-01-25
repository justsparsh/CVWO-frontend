import PostList from "../components/PostList";
import NavBar from "../components/NavBar";
import StandardButton from "../components/StandardButton";
import SubmitBox from "../components/SubmitBox";
import TagFilter from "../components/TagFilter";
import { apiURL } from "../data/API_URL";
import { StockProp, SentimentProp } from "../types/FilterDataProps";
import { fetchThreadCount, handleDeleteClick, handleEditClick } from "../components/DataMethods";
import "./styles.css";

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pagination } from "@mui/material";

const MyThreads: React.FC = () => {
    const token = localStorage.getItem("access-token"); //Retrieve auth token from cache
    const { name } = useParams();
    const navigate = useNavigate();
    const [isAddingThread, setIsAddingThread] = useState(false); //Controlling visibility of submit box
    const [postListKey, setPostListKey] = useState(0); // used to refresh threads without refreshing page
    const [pageNumber, setPageNumber] = useState<number>(1); //page number for API calls
    const userID = localStorage.getItem("user_id"); //Retrieve user ID from cache
    const [tickers, setTickers] = useState<string[]>([]); //filter tags for API calls
    const [sentiments, setSentiments] = useState<string[]>([]); //filter tags for API calls
    const { numOfThreads, updateThreadCount } = fetchThreadCount(
        //Fetch number of threads for pagination
        true,
        Number(userID),
        undefined,
        tickers ?? [],
        sentiments ?? [],
    );

    useEffect(() => {
        // Call updateThreadCount after setting tickers and sentiments
        updateThreadCount();
    }, [tickers, sentiments]);

    const postURL = `${apiURL}/threads?page=${pageNumber}&&userID=${userID}&tickers=${encodeURIComponent(
        JSON.stringify(tickers),
    )}&sentiments=${encodeURIComponent(JSON.stringify(sentiments))}`;

    const handleNewPostButtonClick = () => {
        setIsAddingThread(true);
    };

    const handlePostCancel = () => {
        setIsAddingThread(false);
    };

    // API call for submitting post
    const handlePostSubmit = async (
        threadText: string,
        threadTitle: string | undefined,
        ticker: string | undefined,
        sentiment: string | undefined,
    ) => {
        try {
            if (userID) {
                const response = await fetch("https://cvwo-backend-f3sl.onrender.com/threads", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Name: name,
                        Authorization: `Bearer ${token} `,
                    } as HeadersInit,
                    body: JSON.stringify({
                        userID: userID,
                        userName: name,
                        text: threadText,
                        threadTitle: threadTitle,
                        ticker_list: ticker,
                        sentiment_list: sentiment,
                    }),
                });

                const data = await response.json();
                if (data.error == "Invalid user authentication") {
                    alert("User authentication failed. Please sign in again");
                    navigate("/");
                }
                // console.log("Response from server:", data);

                updateThreadCount();
                setIsAddingThread(false);
                setPostListKey((prevKey) => prevKey + 1);
            }
        } catch (error) {
            alert("Could not submit.");
            // console.error("Error:", error);
        }
    };

    const handleTagFilter = (selectedStocks: StockProp[], selectedSentiments: SentimentProp[]) => {
        setTickers(selectedStocks.map((stock) => stock.name));
        setSentiments(selectedSentiments.map((sentiment) => sentiment.name));
        setPostListKey((prevKey) => prevKey + 1);
    };

    const deleteFuncWrapper = async (ID: number) => {
        await handleDeleteClick(ID, true, name);
        updateThreadCount();
        setPostListKey((prevKey) => prevKey + 1);
    };

    const editFuncWrapper = async (ID: number, textInput: string) => {
        await handleEditClick(ID, textInput, true, name);
        setPostListKey((prevKey) => prevKey + 1);
    };

    return (
        <div className="background">
            {!isAddingThread && <NavBar />}
            <div className="main-container">
                {userID !== null && (
                    <PostList
                        key={postListKey}
                        url={postURL}
                        name={name}
                        linkToThread={true}
                        isThread={true}
                        deletePress={deleteFuncWrapper}
                        editPress={editFuncWrapper}
                    />
                )}
                <Pagination
                    count={Math.ceil(numOfThreads / 5)}
                    className="pagination"
                    onChange={(e, page) => setPageNumber(page)}
                />
            </div>
            <StandardButton label="New Thread" onClick={handleNewPostButtonClick} />

            {isAddingThread && (
                <SubmitBox submitPress={handlePostSubmit} cancelPress={handlePostCancel} isThread={true} />
            )}
            {!isAddingThread && <TagFilter onTagFilter={handleTagFilter} />}
        </div>
    );
};

export default MyThreads;
