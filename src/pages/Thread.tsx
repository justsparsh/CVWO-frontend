import PostList from "../components/PostList";
import NavBar from "../components/NavBar";
import StandardButton from "../components/StandardButton";
import SubmitBox from "../components/SubmitBox";
import { fetchUserData } from "../components/fetchUserID";
import "./styles.css";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Pagination } from "@mui/material";

const Thread: React.FC = () => {
    const navBarWidth = 200;
    const { name, threadID } = useParams();
    const [isAddingPost, setIsAddingPost] = useState(false);
    const [postListKey, setPostListKey] = useState(0);
    const [numOfPosts, setNumOfPosts] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const threadURL = `http://localhost:3000/threads/${threadID}`;
    const postURL = `http://localhost:3000/posts?page=${pageNumber}&threadID=${threadID}`;

    const userID = fetchUserData(name).userID;

    const findNumOfPosts = async () => {
        const response = await fetch(`http://localhost:3000/posts/count?threadID=${threadID}`);
        const data = await response.json();
        console.log("Number of posts:", data);
        return data.total_posts;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const count = await findNumOfPosts();
                setNumOfPosts(count);
            } catch (error) {
                console.error("Error fetching post count:", error);
            }
        };

        fetchData();
    }, []);

    const handleNewPostButtonClick = () => {
        setIsAddingPost(true);
    };

    const handlePostCancel = () => {
        setIsAddingPost(false);
    };

    const handlePostSubmit = async (postText: string) => {
        try {
            if (userID) {
                const response = await fetch("http://localhost:3000/posts", {
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

                const updatedNumOfPosts = await findNumOfPosts();
                setNumOfPosts(updatedNumOfPosts);
                setIsAddingPost(false);
                setPostListKey((prevKey) => prevKey + 1);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDeleteClick = async (ID: number) => {
        try {
            if (userID) {
                const response = await fetch(`http://localhost:3000/posts/${ID}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();
                console.log("Response from server:", data);

                // updateThreadCount();
                setPostListKey((prevKey) => prevKey + 1);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="background">
            <div className="main-container">
                {!isAddingPost && <NavBar setWidth={navBarWidth} />}

                <div style={{ width: "50%" }}>
                    <PostList
                        url={threadURL}
                        name={name}
                        colorCode="#7FC7D9"
                        linkToThread={false}
                        isThread={true}
                        deletePress={handleDeleteClick}
                    />
                    <PostList
                        key={postListKey}
                        url={postURL}
                        name={name}
                        linkToThread={false}
                        isThread={false}
                        deletePress={handleDeleteClick}
                    />
                </div>

                <StandardButton label="Reply" onClick={handleNewPostButtonClick} />

                {isAddingPost && (
                    <SubmitBox submitPress={handlePostSubmit} cancelPress={handlePostCancel} isThread={false} />
                )}
            </div>
            <div>
                <Pagination
                    count={Math.ceil(numOfPosts / 5)}
                    className="pagination"
                    onChange={(e, page) => setPageNumber(page)}
                />
            </div>
        </div>
    );
};

export default Thread;
