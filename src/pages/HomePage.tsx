import PostList from "../components/PostList";
import NavBar from "../components/NavBar";
import StandardButton from "../components/StandardButton";
import SubmitBox from "../components/SubmitBox";
import TagFilter from "../components/TagFilter";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Pagination } from "@mui/material";

const HomePage: React.FC = () => {
    const navBarWidth = 200;
    const { name } = useParams();
    const [isAddingThread, setIsAddingThread] = useState(false);
    const [postListKey, setPostListKey] = useState(0);
    const [threadText, setThreadText] = useState<string>("");
    const [threadTitle, setThreadTitle] = useState<string>("");
    const [numOfThreads, setNumOfThreads] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const postURL = `http://localhost:3000/threads?page=${pageNumber}`;

    const findUserID = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users?name=${name}`);
            const data = await response.json();
            console.log("User data:", data);
            return data[0]?.id || null;
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    };

    const findNumOfThreads = async () => {
        const response = await fetch("http://localhost:3000/threads/count");
        const data = await response.json();
        console.log("Number of threads:", data);
        return data.total_threads;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const count = await findNumOfThreads();
                setNumOfThreads(count);
            } catch (error) {
                console.error("Error fetching post count:", error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setThreadText(event.target.value);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setThreadTitle(event.target.value);
    };

    const handleNewPostButtonClick = () => {
        setIsAddingThread(true);
    };

    const handlePostCancel = () => {
        setIsAddingThread(false);
    };

    const handlePostSubmit = async () => {
        try {
            const userId = await findUserID();

            if (userId) {
                const response = await fetch("http://localhost:3000/threads", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userID: userId,
                        userName: name,
                        text: threadText,
                        threadTitle: threadTitle,
                    }),
                });

                const data = await response.json();
                console.log("Response from server:", data);

                const updatedNumOfThreads = await findNumOfThreads();
                setNumOfThreads(updatedNumOfThreads);
                setIsAddingThread(false);
                setPostListKey((prevKey) => prevKey + 1);
                setThreadText("");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: navBarWidth,
                    justifyContent: "center",
                    marginTop: "20px",
                }}
            >
                {!isAddingThread && <NavBar setWidth={navBarWidth} />}

                <PostList
                    key={postListKey}
                    url={postURL}
                    name={name}
                    boxWidth="50%"
                    linkToThread={true}
                    isThread={true}
                />
                <StandardButton label="New Thread" onClick={handleNewPostButtonClick} />

                {isAddingThread && (
                    <SubmitBox
                        textFieldValue={threadText}
                        textFieldChange={handleInputChange}
                        submitPress={handlePostSubmit}
                        cancelPress={handlePostCancel}
                        withTitle={true}
                        titleFieldValue={threadTitle}
                        titleFieldChange={handleTitleChange}
                    />
                )}
                <TagFilter />
            </div>
            <div>
                <Pagination
                    count={Math.ceil(numOfThreads / 5)}
                    style={{ marginLeft: navBarWidth }}
                    onChange={(e, page) => setPageNumber(page)}
                />
            </div>
        </div>
    );
};

export default HomePage;
