import PostList from "../components/PostList";
import NavBar from "../components/NavBar";
import StandardButton from "../components/StandardButton";
import SubmitBox from "../components/SubmitBox";
import { fetchThreadCount, handleDeleteClick, handleEditClick } from "../components/DataMethods";
import { apiURL } from "../data/API_URL";
import "./styles.css";

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pagination } from "@mui/material";

const Thread: React.FC = () => {
    const token = localStorage.getItem("access-token"); //Retrieve auth token from cache
    const { name, threadID } = useParams(); //Retrieve params for API calls
    const navigate = useNavigate();
    const [isAddingPost, setIsAddingPost] = useState(false); //Controlling visibility of submit box
    const [postListKey, setPostListKey] = useState(0); // used to refresh posts without refreshing page
    const [threadKey, setThreadKey] = useState(0); // used to refresh thread without refreshing page
    const [pageNumber, setPageNumber] = useState<number>(1); //page number for API calls
    const threadURL = `${apiURL}/threads/${threadID}`; // API url for thread retrieval
    const postURL = `${apiURL}/posts?page=${pageNumber}&threadID=${threadID}`; // API url for post retrieval

    const userID = localStorage.getItem("user_id"); //Retrieve user ID from cache

    //Fetch number of posts for pagination
    const { numOfThreads, updateThreadCount } = fetchThreadCount(
        false,
        undefined,
        threadID ? parseInt(threadID) : undefined,
    );

    // Control submit box
    const handleNewPostButtonClick = () => {
        setIsAddingPost(true);
    };

    const handlePostCancel = () => {
        setIsAddingPost(false);
    };

    // API call for submitting post
    const handlePostSubmit = async (postText: string) => {
        try {
            if (userID) {
                const response = await fetch(`${apiURL}/posts`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Name: name,
                        Authorization: `Bearer ${token} `,
                    } as HeadersInit,
                    body: JSON.stringify({
                        userID: userID,
                        userName: name,
                        text: postText,
                        threadID: threadID,
                    }),
                });

                const data = await response.json();
                if (data.error == "Invalid user authentication") {
                    alert("User authentication failed. Please sign in again");
                    navigate("/");
                }

                updateThreadCount();
                setIsAddingPost(false); // Returns page to original view
                setPostListKey((prevKey) => prevKey + 1); // Refreshes posts
            }
        } catch (error) {
            alert("Unable to post to this thread.");
        }
    };

    const deleteThread = async (ID: number) => {
        await handleDeleteClick(ID, true, name);
        navigate(`/home/${name}`);
    };

    const deletePost = async (ID: number) => {
        await handleDeleteClick(ID, false, name);
        updateThreadCount();
        setPostListKey((prevKey) => prevKey + 1);
    };

    const editThread = async (ID: number, textInput: string) => {
        await handleEditClick(ID, textInput, true, name);
        setThreadKey((prevKey) => prevKey + 1);
    };

    const editPost = async (ID: number, textInput: string) => {
        await handleEditClick(ID, textInput, false, name);
        setPostListKey((prevKey) => prevKey + 1);
    };

    return (
        <div className="background">
            {!isAddingPost && <NavBar />}

            <div className="main-container">
                <PostList
                    key={threadKey}
                    url={threadURL}
                    name={name}
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
                <Pagination
                    count={Math.ceil(numOfThreads / 5)}
                    className="pagination"
                    onChange={(e, page) => setPageNumber(page)}
                />
            </div>

            <StandardButton label="Reply" onClick={handleNewPostButtonClick} />

            {isAddingPost && (
                <SubmitBox submitPress={handlePostSubmit} cancelPress={handlePostCancel} isThread={false} />
            )}
        </div>
    );
};

export default Thread;
