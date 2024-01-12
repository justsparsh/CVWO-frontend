import Post, { PostProps } from "./Post";
import { Stack } from "@mui/material";

import React, { useState, useEffect } from "react";

type PostListProp = {
    url: string;
    name: string | undefined;
    boxWidth?: string;
    colorCode?: string;
    linkToThread: boolean;
    isThread: boolean;
};

const PostList: React.FC<PostListProp> = ({ url, name, boxWidth, colorCode, linkToThread, isThread }) => {
    const [posts, setPosts] = useState<PostProps[]>([]);

    useEffect(() => {
        // Fetch data when the component mounts or page changes
        fetch(url)
            .then((response) => response.json())
            .then((data) => setPosts(data))
            .catch((error) => console.log(error));
    }, [url]);

    return (
        <Stack style={{ width: boxWidth || "100%" }}>
            {posts.map((post) => (
                <Post
                    key={post.id}
                    id={isThread ? post.id : post.threadID}
                    text={post.text}
                    userName={post.userName}
                    created_at={post.created_at}
                    name={name}
                    colorCode={colorCode}
                    linkToThread={linkToThread}
                    threadTitle={isThread ? post.threadTitle : undefined}
                />
            ))}
        </Stack>
    );
};

export default PostList;
