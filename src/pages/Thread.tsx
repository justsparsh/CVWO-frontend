import PostList from "../components/PostList";
import NavBar from "../components/NavBar";
import StandardButton from "../components/StandardButton";
import SubmitBox from "../components/SubmitBox";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Pagination } from "@mui/material";

const Thread: React.FC = () => {
    const navBarWidth = 250;
    const { name, threadID } = useParams();
    const [isAddingPost, setIsAddingPost] = useState(false);
    const [postListKey, setPostListKey] = useState(0);
    const [postText, setPostText] = useState("");
    const [numOfPosts, setNumOfPosts] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const threadURL = `http://localhost:3000/threads/${threadID}`;
    const postURL = `http://localhost:3000/posts?page=${pageNumber}&threadID=${threadID}`;

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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostText(event.target.value);
    };

    const handleNewPostButtonClick = () => {
        setIsAddingPost(true);
    };

    const handlePostCancel = () => {
        setIsAddingPost(false);
    };

    const handlePostSubmit = async () => {
        try {
            const userId = await findUserID();

            if (userId) {
                const response = await fetch("http://localhost:3000/posts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userID: userId,
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
                setPostText("");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <Container
                style={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: navBarWidth,
                    justifyContent: "center",
                    marginTop: "20px",
                }}
            >
                {!isAddingPost && <NavBar setWidth={navBarWidth} />}

                <div style={{ width: "50%" }}>
                    <PostList url={threadURL} name={name} colorCode="#CBFFFC" linkToThread={false} isThread={true} />
                    <PostList key={postListKey} url={postURL} name={name} linkToThread={false} isThread={false} />
                </div>

                <StandardButton label="Reply" onClick={handleNewPostButtonClick} />

                {isAddingPost && (
                    <SubmitBox
                        textFieldValue={postText}
                        textFieldChange={handleInputChange}
                        submitPress={handlePostSubmit}
                        cancelPress={handlePostCancel}
                        withTitle={false}
                    />
                )}
            </Container>
            <div>
                <Pagination
                    count={Math.ceil(numOfPosts / 5)}
                    style={{ marginLeft: navBarWidth }}
                    onChange={(e, page) => setPageNumber(page)}
                />
            </div>
        </div>
    );
};

export default Thread;
