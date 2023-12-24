import React, { useState } from "react";
import Post from "../components/Post";
import NavBar from "../components/NavBar";
import StandardButton from "../components/StandardButton";
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
        setIsAddingPost(false);
    };

    return (
        <Container className="home-page-container" style={{ display: "flex", flexDirection: "row", marginLeft: navBarWidth, justifyContent:"center", marginTop:"20px"}}>

            {!isAddingPost && <NavBar setWidth={navBarWidth} />}

            <Stack className="post-stack" style={{ width: "50%" }}>
                <Post text="This is a test" author="just" timestamp={new Date()} />
                <Post text="Another text" author="d" timestamp={new Date()} />
            </Stack>

            {isAddingPost && (
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, background: "rgba(255, 255, 255, 0.9)" }}>
                    <TextField label="Post Text" variant="outlined" fullWidth style={{ marginBottom: "8px" }} />
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

            <StandardButton label="New Post" onClick={handleNewPostButtonClick} />
        </Container>
    );
};

export default HomePage;

