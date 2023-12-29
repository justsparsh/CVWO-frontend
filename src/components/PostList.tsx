import Post, { PostProps } from "./Post";
import { Stack } from "@mui/material";

import React, { useState, useEffect } from "react";

type PostListProp = {
    page: number;
};

const PostList: React.FC<PostListProp> = ({ page }) => {
    const [posts, setPosts] = useState<PostProps[]>([]);

    useEffect(() => {
        // Fetch data when the component mounts or page changes
        fetch(`http://localhost:3000/posts?page=${page}`)
            .then((response) => response.json())
            .then((data) => setPosts(data))
            .catch((error) => console.log(error));
    }, [page]);

    return (
        <Stack>
            {posts.map((post) => (
                <Post
                    key={post.id}
                    id={post.id}
                    text={post.text}
                    userName={post.userName}
                    created_at={post.created_at}
                />
            ))}
        </Stack>
    );
};

export default PostList;
