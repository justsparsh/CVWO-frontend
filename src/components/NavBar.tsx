import React from "react";
import Drawer from "@mui/material/Drawer";
import { Button, Box, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

type NavBarProps = {
    setWidth: number;
};

const NavBar: React.FC<NavBarProps> = ({ setWidth }) => {
    const navigate = useNavigate();
    const { name } = useParams();
    return (
        <div>
            <Drawer variant="permanent" anchor="left">
                <Box sx={{ width: setWidth }}>
                    <Stack>
                        <Button onClick={() => navigate(`/home/${name}`)}> Home </Button>
                        <Button onClick={() => navigate(`/mythreads/${name}`)}> My Threads </Button>
                        <Button onClick={() => navigate(`/myposts/${name}`)}> My Comments </Button>
                    </Stack>
                </Box>
            </Drawer>
        </div>
    );
};

export default NavBar;
