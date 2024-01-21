import PostList from "../components/PostList";
import NavBar from "../components/NavBar";
import StandardButton from "../components/StandardButton";
import SubmitBox from "../components/SubmitBox";
import TagFilter from "../components/TagFilter";
import { StockProp, SentimentProp } from "../types/FilterDataProps";
import { fetchUserData } from "../components/fetchUserID";
import { fetchThreadCount } from "../components/fetchThreadCount";
import "./styles.css";

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Pagination } from "@mui/material";

const MyThreads: React.FC = () => {
    const navBarWidth = 200;
    const { name } = useParams();
    const [isAddingThread, setIsAddingThread] = useState(false);
    const [postListKey, setPostListKey] = useState(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const userID = fetchUserData(name).userID;
    const { numOfThreads, updateThreadCount } = fetchThreadCount(userID);
    const [tickers, setTickers] = useState<string[]>([]);
    const [sentiments, setSentiments] = useState<string[]>([]);
    const postURL = `http://localhost:3000/threads?page=${pageNumber}&&userID=${userID}&tickers=${encodeURIComponent(
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
                const response = await fetch("http://localhost:3000/threads", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
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
                console.log("Response from server:", data);

                updateThreadCount();
                setIsAddingThread(false);
                setPostListKey((prevKey) => prevKey + 1);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleTagFilter = (selectedStocks: StockProp[], selectedSentiments: SentimentProp[]) => {
        setTickers(selectedStocks.map((stock) => stock.name));
        setSentiments(selectedSentiments.map((sentiment) => sentiment.name));
        setPostListKey((prevKey) => prevKey + 1);
    };

    const handleDeleteClick = async (ID: number) => {
        try {
            if (userID) {
                const response = await fetch(`http://localhost:3000/threads/${ID}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();
                console.log("Response from server:", data);

                updateThreadCount();
                setPostListKey((prevKey) => prevKey + 1);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="background">
            <div className="main-container">
                {!isAddingThread && <NavBar setWidth={navBarWidth} />}

                {userID !== null && (
                    <PostList
                        key={postListKey}
                        url={postURL}
                        name={name}
                        boxWidth="50%"
                        linkToThread={true}
                        isThread={true}
                        deletePress={handleDeleteClick}
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
                    count={Math.ceil(numOfThreads / 5)}
                    className="pagination"
                    onChange={(e, page) => setPageNumber(page)}
                />
            </div>
        </div>
    );
};

export default MyThreads;

// const findUserID = async () => {
//     try {
//         const response = await fetch(`http://localhost:3000/users?name=${name}`);
//         const data = await response.json();
//         // console.log("User data:", data);
//         return data[0]?.id || null;
//     } catch (error) {
//         console.error("Error:", error);
//         return null;
//     }
// };

// useEffect(() => {
//     const fetchUserID = async () => {
//         try {
//             const id = await findUserID();
//             console.log("Fetched userID:", id);
//             setUserID(() => {
//                 console.log("Updated userID:", id);
//                 return id;
//             });
//         } catch (error) {
//             console.error("Error fetching userID:", error);
//         }
//     };
//     fetchUserID();
// }, []);
