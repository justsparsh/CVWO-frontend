import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Box } from "@mui/material";

type NavBarProps = {
    setWidth: number;
};

const NavBar: React.FC<NavBarProps> = ({ setWidth }) => {
    return (
        <div>
            <Drawer variant="permanent" anchor="left">
                <Box sx={{ width: setWidth }}>
                    <List>
                        <ListItemButton>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemText primary="My Posts" />
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>
        </div>
    );
};

export default NavBar;
