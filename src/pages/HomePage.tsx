import PostList from "../components/PostList";
import NavBar from "../components/NavBar";
import StandardButton from "../components/StandardButton";
import SubmitBox from "../components/SubmitBox";
import TagFilter from "../components/TagFilter";
import { StockProp, SentimentProp } from "../types/FilterDataProps";
import { fetchThreadCount, handleDeleteClick, handleEditClick } from "../components/DataMethods";
import { apiURL } from "../data/API_URL";
import "./styles.css";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";

const HomePage: React.FC = () => {
    const token = localStorage.getItem("access-token"); //Retrieve auth token from cache
    const navigate = useNavigate(); //Retrieve params for API calls
    const { name } = useParams();
    const [isAddingThread, setIsAddingThread] = useState<boolean>(false); //Controlling visibility of submit box
    const [postListKey, setPostListKey] = useState(0); // used to refresh threads without refreshing page
    const [pageNumber, setPageNumber] = useState<number>(1); //page number for API calls
    const [tickers, setTickers] = useState<string[]>([]); //filter tags for API calls
    const [sentiments, setSentiments] = useState<string[]>([]); //filter tags for API calls
    const postURL = `${apiURL}/threads?page=${pageNumber}&tickers=${encodeURIComponent(
        JSON.stringify(tickers),
    )}&sentiments=${encodeURIComponent(JSON.stringify(sentiments))}`;

    const userID = localStorage.getItem("user_id"); //Retrieve user ID from cache

    //Fetch number of threads for pagination
    const { numOfThreads, updateThreadCount } = fetchThreadCount(
        true,
        undefined,
        undefined,
        tickers ?? [],
        sentiments ?? [],
    );

    useEffect(() => {
        // Call updateThreadCount after setting tickers and sentiments
        updateThreadCount();
    }, [tickers, sentiments]);

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
                const response = await fetch(`${apiURL}/threads`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Name: name,
                        Authorization: token ? `Bearer ${token}` : undefined,
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

                updateThreadCount();
                setIsAddingThread(false);
                setPostListKey((prevKey) => prevKey + 1);
            }
        } catch (error) {
            alert("Could not submit.");
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
                <PostList
                    key={postListKey}
                    url={postURL}
                    name={name}
                    linkToThread={true}
                    isThread={true}
                    deletePress={deleteFuncWrapper}
                    editPress={editFuncWrapper}
                />
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

export default HomePage;
