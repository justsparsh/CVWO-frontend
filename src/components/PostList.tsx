import Post from "./Post";
import { PostProps } from "../types/PostProps";

import React, { useState, useEffect } from "react";
import { Stack } from "@mui/material";

type PostListProp = {
    url: string;
    name: string | undefined;
    boxWidth?: string;
    colorCode?: string;
    linkToThread: boolean;
    isThread: boolean;
    deletePress: (ID: number) => void;
    editPress: (ID: number, textInput: string) => void;
};

const PostList: React.FC<PostListProp> = ({
    url,
    name,
    boxWidth,
    colorCode,
    linkToThread,
    isThread,
    deletePress,
    editPress,
}) => {
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
                setPosts(data);
            })
            .catch(() => {
                alert("Error in fetching data. It is possible that this thread has been deleted.");
                // console.log(error);
            });
    }, [url, token]);

    return (
        posts !== null &&
        posts.length > 0 && (
            <Stack style={{ width: boxWidth || "100%" }}>
                {posts.map((post: PostProps) => (
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
