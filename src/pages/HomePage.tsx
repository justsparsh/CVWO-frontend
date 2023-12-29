// import Post from "../components/Post";
import PostList from "../components/PostList";
import NavBar from "../components/NavBar";
import StandardButton from "../components/StandardButton";

import React, { useState } from "react";
import { Container, Stack, TextField, Button } from "@mui/material";

const HomePage: React.FC = () => {
    const navBarWidth = 250;
    const [isAddingPost, setIsAddingPost] = useState(false);

    const handleNewPostButtonClick = () => {
        setIsAddingPost(true);
    };

    const handlePostCancel = () => {
        setIsAddingPost(false);
    };

    const handlePostSubmit = () => {
        // Add your logic to handle the submitted post
        fetch("http://localhost:3000/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userID: 4,
                userName: "just",
                text: "Hi this is a test",
                isParentPost: true,
                parentPostId: null,
                childPostId: [],
            }),
        })
            .then((response) => {
                response.json();
            })
            .then((data) => {
                console.log("Response from server:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        setIsAddingPost(false);
    };

    return (
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

            {/* <Stack style={{ width: "50%" }}>
                <Post text="This is a test" author="just" timestamp={new Date()} />
                <Post text="Another text" author="d" timestamp={new Date()} />
            </Stack> */}
            <PostList page={1} />
            <StandardButton label="New Post" onClick={handleNewPostButtonClick} />

            {isAddingPost && (
                <div
                    style={{
                        position: "absolute",
                        top: "20px",
                        left: "20%",
                        right: "20%",
                        bottom: 0,
                        // width: "50%",
                        zIndex: 1,
                        background: "rgba(255, 255, 255, 0.9)",
                    }}
                >
                    <TextField
                        label="Post Text"
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: "8px" }}
                        multiline={true}
                    />
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="contained" onClick={handlePostSubmit}>
                            Submit
                        </Button>
                        <Button variant="outlined" onClick={handlePostCancel}>
                            Cancel
                        </Button>
                    </Stack>
                </div>
            )}
        </Container>
    );
};

export default HomePage;
