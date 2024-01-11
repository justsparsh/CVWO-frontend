import Post, { PostProps } from "./Post";
import { Stack } from "@mui/material";

import React, { useState, useEffect } from "react";

type PostListProp = {
    url: string;
    name: string | undefined;
};

const PostList: React.FC<PostListProp> = ({ url, name }) => {
    const [posts, setPosts] = useState<PostProps[]>([]);

    useEffect(() => {
        // Fetch data when the component mounts or page changes
        fetch(url)
            .then((response) => response.json())
            .then((data) => setPosts(data))
            .catch((error) => console.log(error));
    }, [url]);

    return (
        <Stack style={{ width: "50%" }}>
            {posts.map((post) => (
                <Post
                    key={post.id}
                    id={post.id}
                    text={post.text}
                    userName={post.userName}
                    created_at={post.created_at}
                    name={name}
                />
            ))}
        </Stack>
    );
};

export default PostList;
