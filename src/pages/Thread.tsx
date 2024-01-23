import PostList from "../components/PostList";
import NavBar from "../components/NavBar";
import StandardButton from "../components/StandardButton";
import SubmitBox from "../components/SubmitBox";
import { fetchUserData, fetchThreadCount, handleDeleteClick, handleEditClick } from "../components/DataMethods";
import { apiURL } from "../data/API_URL";
import "./styles.css";

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Pagination } from "@mui/material";

const Thread: React.FC = () => {
    const navBarWidth = 200;
    const { name, threadID } = useParams();
    const [isAddingPost, setIsAddingPost] = useState(false);
    const [postListKey, setPostListKey] = useState(0);
    const [threadKey, setThreadKey] = useState(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const threadURL = `${apiURL}/threads/${threadID}`;
    const postURL = `${apiURL}/posts?page=${pageNumber}&threadID=${threadID}`;

    const userID = fetchUserData(name).userID;
    const { numOfThreads, updateThreadCount } = fetchThreadCount(
        false,
        undefined,
        threadID ? parseInt(threadID) : undefined,
    );

    const handleNewPostButtonClick = () => {
        setIsAddingPost(true);
    };

    const handlePostCancel = () => {
        setIsAddingPost(false);
    };

    const handlePostSubmit = async (postText: string) => {
        try {
            if (userID) {
                const response = await fetch(`${apiURL}/posts`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userID: userID,
                        userName: name,
                        text: postText,
                        threadID: threadID,
                    }),
                });

                const data = await response.json();
                console.log("Response from server:", data);

                updateThreadCount();
                setIsAddingPost(false);
                setPostListKey((prevKey) => prevKey + 1);
            }
        } catch (error) {
            alert("Unable to post to this thread.");
            console.error("Error:", error);
        }
    };

    const deleteThread = async (ID: number) => {
        handleDeleteClick(ID, true);
        setThreadKey((prevKey) => prevKey + 1);
    };

    const deletePost = async (ID: number) => {
        handleDeleteClick(ID, false);
        updateThreadCount();
        setPostListKey((prevKey) => prevKey + 1);
    };

    const editThread = async (ID: number, textInput: string) => {
        handleEditClick(ID, textInput, true);
        setPostListKey((prevKey) => prevKey + 1);
    };

    const editPost = async (ID: number, textInput: string) => {
        handleEditClick(ID, textInput, false);
        setPostListKey((prevKey) => prevKey + 1);
    };

    return (
        <div className="background">
            <div className="main-container">
                {!isAddingPost && <NavBar setWidth={navBarWidth} />}

                <div style={{ width: "50%" }}>
                    <PostList
                        key={threadKey}
                        url={threadURL}
                        name={name}
                        // colorCode="#7FC7D9"
                        colorCode="#d9e0a6"
                        linkToThread={false}
                        isThread={true}
                        deletePress={deleteThread}
                        editPress={editThread}
                    />
                    <PostList
                        key={postListKey}
                        url={postURL}
                        name={name}
                        linkToThread={false}
                        isThread={false}
                        deletePress={deletePost}
                        editPress={editPost}
                    />
                </div>

                <StandardButton label="Reply" onClick={handleNewPostButtonClick} />

                {isAddingPost && (
                    <SubmitBox submitPress={handlePostSubmit} cancelPress={handlePostCancel} isThread={false} />
                )}
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

export default Thread;
