import Post from "./Post";
import { PostProps } from "../types/PostProps";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";

type PostListProp = {
    url: string;
    name: string | undefined;
    colorCode?: string;
    linkToThread: boolean;
    isThread: boolean;
    deletePress: (ID: number) => void;
    editPress: (ID: number, textInput: string) => void;
};

const PostList: React.FC<PostListProp> = ({ url, name, colorCode, linkToThread, isThread, deletePress, editPress }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("access-token");
    const [posts, setPosts] = useState<PostProps[]>([]);
    useEffect(() => {
        // Fetch data when the component mounts or page changes
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Name: name,
                Authorization: `Bearer ${token} `,
            } as HeadersInit,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error == "Invalid user authentication") {
                    alert("User authentication failed. Please sign in again");
                    navigate("/");
                }
                setPosts(data);
            })
            .catch(() => {
                alert("Error in fetching data. It is possible that this thread has been deleted.");
            });
    }, [url]);

    return (
        posts !== null &&
        posts.length > 0 && (
            <Stack>
                {posts.map((post: PostProps) => (
                    //Inserts all retrieved posts according to styling in Post.tsx
                    <Post
                        key={post.id}
                        id={post.id}
                        threadID={isThread ? undefined : post.threadID}
                        text={post.text}
                        userName={post.userName}
                        created_at={post.created_at}
                        name={name}
                        colorCode={colorCode}
                        linkToThread={linkToThread}
                        threadTitle={isThread ? post.threadTitle : undefined}
                        ticker_list={isThread ? post.ticker_list : undefined}
                        sentiment_list={isThread ? post.sentiment_list : undefined}
                        deletePress={deletePress}
                        editPress={editPress}
                    />
                ))}
            </Stack>
        )
    );
};

export default PostList;
