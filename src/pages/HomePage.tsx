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

const HomePage: React.FC = () => {
    const navBarWidth = 200;
    const { name } = useParams();
    const [isAddingThread, setIsAddingThread] = useState<boolean>(false);
    const [postListKey, setPostListKey] = useState(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [tickers, setTickers] = useState<string[]>([]);
    const [sentiments, setSentiments] = useState<string[]>([]);
    const postURL = `http://localhost:3000/threads?page=${pageNumber}&tickers=${encodeURIComponent(
        JSON.stringify(tickers),
    )}&sentiments=${encodeURIComponent(JSON.stringify(sentiments))}`;

    const userID = fetchUserData(name).userID;
    const { numOfThreads, updateThreadCount } = fetchThreadCount();

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

                <PostList
                    key={postListKey}
                    url={postURL}
                    name={name}
                    boxWidth="50%"
                    linkToThread={true}
                    isThread={true}
                    deletePress={handleDeleteClick}
                />
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

export default HomePage;

// const numOfThreads = fetchThreadCount().numOfThreads;
// const findNumOfThreads = async () => {
//     const response = await fetch("http://localhost:3000/threads/count");
//     const data = await response.json();
//     console.log("Number of threads:", data);
//     return data.total_threads;
// };

// useEffect(() => {
//     const fetchData = async () => {
//         try {
//             const count = await findNumOfThreads();
//             setNumOfThreads(count);
//         } catch (error) {
//             console.error("Error fetching post count:", error);
//         }
//     };

//     fetchData();
// }, []);
