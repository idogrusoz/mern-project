import {
    AppBar,
    createStyles,
    fade,
    InputBase,
    makeStyles,
    Paper,
    Theme,
    Toolbar,
    Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { useHistory } from "react-router-dom";
import { SearchedUser } from "../../../../interfaces/user.interfaces";
import api from "../../api";
import AvatarMenu from "./AvatarMenu";
import SingleSearchResult from "./SingleSearchResult";
import { ProfileContext } from "../Profile/ProfileContext";
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
        result: {
            "&:hover": {
                backgroundColor: "#ffffff",
                cursor: "pointer",
            },
        },
        resultContainer: { position: "absolute", width: "100%", backgroundColor: "rgba(255, 255, 255, 0.7)" },
    }),
);
const NavBar = () => {
    const [searchResults, setSearchResults] = useState<SearchedUser[]>([]);
    const [displayResults, setDisplayResults] = useState<boolean>(false);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const { signOut, user } = useContext(AuthContext);
    const { setProfileOwner } = useContext(ProfileContext);
    const history = useHistory();
    const classes = useStyles();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const pickUser = (user: SearchedUser) => {
        setProfileOwner(user);
        setDisplayResults(false);
        history.push(`/username/${user.userName}`);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const goToProfile = () => {
        setAnchorEl(null);
        setProfileOwner(null);
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

    const handleChange = async (e: { target: { value: string } }) => {
        try {
            const results = await api.get(`users/search/${e.target.value}`);
            setSearchResults(results.data.data);
            setDisplayResults(results.data.data.length > 0);
        } catch (error) {
            setSearchResults([]);
        }
    };
    const resultsContainer = useRef<HTMLElement | undefined>();
    const pageClick = (e: any) => {
        if (resultsContainer.current && !resultsContainer.current!.contains(e.target)) {
            setDisplayResults(false);
        }
    };
    useEffect(() => {
        window.addEventListener("mousedown", pageClick, false);
    }, []);

    return (
        <AppBar>
            <Toolbar style={{ display: "flex", justifyContent: "space-around" }}>
                <Typography variant="h6" style={{ fontWeight: 900 }}>
                    KERPICH
                </Typography>
                {user && (
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
                            onChange={handleChange}
                        />
                        {displayResults && (
                            <Paper className={classes.resultContainer} ref={resultsContainer}>
                                {searchResults.map((user: SearchedUser, i: number) => {
                                    return <SingleSearchResult user={user} pickUser={pickUser} key={i} />;
                                })}
                            </Paper>
                        )}
                    </div>
                )}
                {user && (
                    <AvatarMenu
                        handleClick={handleClick}
                        handleClose={handleClose}
                        anchorEl={anchorEl}
                        goToProfile={goToProfile}
                        goToAdd={goToAdd}
                        handleSignOut={handleSignOut}
                    />
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
