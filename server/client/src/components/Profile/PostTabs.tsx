import { Button, Grid, makeStyles } from "@material-ui/core";
import React, { Dispatch, FunctionComponent, SetStateAction, useContext } from "react";
import { ProfileContext } from "./ProfileContext";

type PostTabsProps = {
    activeTab: "feed" | "posts" | "likes";
    setActiveTab: Dispatch<SetStateAction<"feed" | "posts" | "likes">>;
};

const useStyles = makeStyles((theme) => ({
    icon: {
        textAlign: "center",
    },
    activeTab: {
        textAlign: "center",
        backgroundColor: theme.palette.primary.dark,
    },
    activeButton: {
        color: "#ffffff",
    },
}));

const PostTabs: FunctionComponent<PostTabsProps> = ({ activeTab, setActiveTab }) => {
    const { profileOwner } = useContext(ProfileContext);
    const classes = useStyles();
    return (
        <Grid container direction="row">
            {!profileOwner && (
                <Grid item xs={4} className={activeTab === "feed" ? classes.activeTab : classes.icon}>
                    <Button
                        color="primary"
                        onClick={() => {
                            setActiveTab("feed");
                        }}
                        className={activeTab === "feed" ? classes.activeButton : undefined}
                        fullWidth
                        id="feedButton"
                    >
                        Feed
                    </Button>
                </Grid>
            )}
            <Grid item xs={profileOwner ? 6 : 4} className={activeTab === "posts" ? classes.activeTab : classes.icon}>
                <Button
                    color="primary"
                    onClick={() => {
                        setActiveTab("posts");
                    }}
                    className={activeTab === "posts" ? classes.activeButton : undefined}
                    fullWidth
                    id="postsButton"
                >
                    Posts
                </Button>
            </Grid>
            <Grid item xs={profileOwner ? 6 : 4} className={activeTab === "likes" ? classes.activeTab : classes.icon}>
                <Button
                    color="primary"
                    onClick={() => setActiveTab("likes")}
                    className={activeTab === "likes" ? classes.activeButton : undefined}
                    fullWidth
                    id="likesButton"
                >
                    Likes
                </Button>
            </Grid>
        </Grid>
    );
};

export default PostTabs;
