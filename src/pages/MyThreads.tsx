import PostList from "../components/PostList";
import NavBar from "../components/NavBar";
import StandardButton from "../components/StandardButton";
import SubmitBox from "../components/SubmitBox";
import TagFilter from "../components/TagFilter";
import { apiURL } from "../data/API_URL";
import { StockProp, SentimentProp } from "../types/FilterDataProps";
import { fetchUserData, fetchThreadCount, handleDeleteClick, handleEditClick } from "../components/DataMethods";
import "./styles.css";

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pagination } from "@mui/material";

const MyThreads: React.FC = () => {
    const token = localStorage.getItem("access-token");
    const { name } = useParams();
    const navigate = useNavigate();
    const [isAddingThread, setIsAddingThread] = useState(false);
    const [postListKey, setPostListKey] = useState(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const userID = fetchUserData(name).userID;
    const [tickers, setTickers] = useState<string[]>([]);
    const [sentiments, setSentiments] = useState<string[]>([]);
    const { numOfThreads, updateThreadCount } = fetchThreadCount(true, userID, undefined, tickers, sentiments);
    const postURL = `${apiURL}/threads?page=${pageNumber}&&userID=${userID}&tickers=${encodeURIComponent(
        JSON.stringify(tickers),
    )}&sentiments=${encodeURIComponent(JSON.stringify(sentiments))}`;

    const handleNewPostButtonClick = () => {
        setIsAddingThread(true);
    };

    const handlePostCancel = () => {
        setIsAddingThread(false);
    };

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
                console.log("Response from server:", data);

                updateThreadCount();
                setIsAddingThread(false);
                setPostListKey((prevKey) => prevKey + 1);
            }
        } catch (error) {
            alert("Could not submit.");
            console.error("Error:", error);
        }
    };

    const handleTagFilter = (selectedStocks: StockProp[], selectedSentiments: SentimentProp[]) => {
        setTickers(selectedStocks.map((stock) => stock.name));
        setSentiments(selectedSentiments.map((sentiment) => sentiment.name));
        setPostListKey((prevKey) => prevKey + 1);
    };

    const deleteFuncWrapper = async (ID: number) => {
        handleDeleteClick(ID, true, name);
        updateThreadCount();
        setPostListKey((prevKey) => prevKey + 1);
    };

    const editFuncWrapper = async (ID: number, textInput: string) => {
        handleEditClick(ID, textInput, true, name);
        setPostListKey((prevKey) => prevKey + 1);
    };

    return (
        <div className="background">
            <div className="main-container">
                {!isAddingThread && <NavBar />}

                {userID !== null && (
                    <PostList
                        key={postListKey}
                        url={postURL}
                        name={name}
                        boxWidth="50%"
                        linkToThread={true}
                        isThread={true}
                        deletePress={deleteFuncWrapper}
                        editPress={editFuncWrapper}
                    />
                )}
                <StandardButton label="New Thread" onClick={handleNewPostButtonClick} />

                {isAddingThread && (
                    <SubmitBox submitPress={handlePostSubmit} cancelPress={handlePostCancel} isThread={true} />
                )}
                {!isAddingThread && <TagFilter onTagFilter={handleTagFilter} />}
            </div>
            <div>
                <Pagination
                    style={{ marginLeft: 150 }}
                    count={Math.ceil(numOfThreads / 5)}
                    className="pagination"
                    onChange={(e, page) => setPageNumber(page)}
                />
            </div>
        </div>
    );
};

export default MyThreads;
