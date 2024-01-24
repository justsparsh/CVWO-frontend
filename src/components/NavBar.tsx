import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Box, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

// type NavBarProps = {
//     width: number;
// };

const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const { name } = useParams();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    return (
        <div style={{ position: "absolute", top: "20px", left: "40px" }}>
            <Button onClick={handleDrawerOpen} style={{ marginLeft: 0 }}>
                <MenuIcon />
            </Button>
            <Drawer variant="temporary" anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
                <Box sx={{ width: 200 }}>
                    <Stack>
                        <Button onClick={() => navigate(`/home/${name}`)}> Home </Button>
                        <Button onClick={() => navigate(`/mythreads/${name}`)}> My Threads </Button>
                        <Button onClick={() => navigate(`/myposts/${name}`)}> My Comments </Button>
                        <Button
                            onClick={() => {
                                localStorage.setItem("access-token", "");
                                navigate("/");
                            }}
                            style={{ color: "red" }}
                        >
                            Log Out
                        </Button>
                    </Stack>
                </Box>
            </Drawer>
        </div>
    );
};

export default NavBar;
