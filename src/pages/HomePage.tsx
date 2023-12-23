import React, { Children } from "react";
import { Stack } from "@mui/material";
import Post from "../components/Post";

const HomePage: React.FC = () => {


    return (
        <Stack>
            <Post text="This is a test" author="just" timestamp={new Date()} />
        </Stack>
    )
};

export default HomePage;