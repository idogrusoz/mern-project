import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";

const NavBar = () => {
    return (
        <AppBar>
            <Toolbar style={{ display: "flex", justifyContent: "left" }}>
                <Typography variant="h6" style={{ fontWeight: 900 }}>
                    KERPICH
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
