import {
    AppBar,
    Avatar,
    createStyles,
    fade,
    IconButton,
    InputBase,
    makeStyles,
    Menu,
    MenuItem,
    Theme,
    Toolbar,
    Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React, { useContext, useState } from "react";
import { AuthContext } from "./auth/AuthContext";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
        },
        search: {
            position: "relative",
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            "&:hover": {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: "100%",
            [theme.breakpoints.up("sm")]: {
                marginLeft: theme.spacing(3),
                width: "auto",
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: "100%",
            position: "absolute",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        inputRoot: {
            color: "inherit",
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create("width"),
            width: "100%",
            [theme.breakpoints.up("md")]: {
                width: "20ch",
            },
        },
    }),
);
const NavBar = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const { signOut } = useContext(AuthContext);
    const history = useHistory();
    const classes = useStyles();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const goToProfile = () => {
        setAnchorEl(null);
        history.push("/");
    };

    const goToAdd = () => {
        setAnchorEl(null);
        history.push("/add-post");
    };

    const handleSignOut = async () => {
        await signOut();

        setAnchorEl(null);
    };

    return (
        <AppBar>
            <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: 100, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={goToProfile}>Profile</MenuItem>
                        <MenuItem onClick={goToAdd}>AddPost</MenuItem>
                        <MenuItem onClick={handleSignOut}>SignOut</MenuItem>
                    </Menu>
                    <Typography variant="h6" style={{ fontWeight: 900 }}>
                        KERPICH
                    </Typography>
                </div>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ "aria-label": "search" }}
                    />
                </div>
                <IconButton color="secondary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <Avatar />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
