import { Button, CircularProgress, Container, Grid, makeStyles } from "@material-ui/core";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { BasePostDocument } from "../../../../interfaces/post.interfaces";
import api from "../../api";
import { AuthContext } from "../Auth/AuthContext";
import PostsContainer from "./PostsContainer";
import { ProfileContext } from "./ProfileContext";
import ProfileOwner from "./ProfileOwner";

const useStyles = makeStyles((theme) => ({
    container: { display: "flex", justifyContent: "center" },
    grid: { width: 640 },
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

const Profile = () => {
    const { user } = useContext(AuthContext);
    const { profileOwner } = useContext(ProfileContext);
    const [feed, setFeed] = useState<BasePostDocument[]>([]);
    const [posts, setPosts] = useState<BasePostDocument[]>([]);
    const [likes, setLikes] = useState<BasePostDocument[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<"feed" | "posts" | "likes">("feed");
    const classes = useStyles();

    const fetchFeed = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await api.get(`posts/${user?._id}/feed`);
            setFeed([...result.data.data]);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            throw error;
        }
    }, [user]);

    const fetchUserPosts = useCallback(async () => {
        setIsLoading(true);
        const id = profileOwner ? profileOwner._id : user?._id;
        try {
            const result = await api.get(`posts/user/${id}`);
            setPosts([...result.data.data]);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            throw error;
        }
    }, [profileOwner, user]);

    const fetchLikedPosts = useCallback(async () => {
        setIsLoading(true);
        const id = profileOwner ? profileOwner._id : user?._id;
        try {
            const result = await api.get(`/posts/likedbyuser/${id}`);
            setLikes([...result.data.data]);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            throw error;
        }
    }, [profileOwner, user]);

    useEffect(() => {
        if (profileOwner) {
            setActiveTab("posts");
        }
    }, [profileOwner]);

    const postsToRender = (): BasePostDocument[] => {
        if (activeTab === "feed") {
            return feed;
        }
        if (activeTab === "posts") {
            return posts;
        }
        if (activeTab === "likes") {
            return likes;
        }
        return [];
    };

    return (
        <Container maxWidth="md" className={classes.container}>
            <Grid container direction="column" justify="center" className={classes.grid}>
                <Grid item>
                    <div className={classes.container}>
                        <ProfileOwner />
                    </div>
                </Grid>
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
                            >
                                Feed
                            </Button>
                        </Grid>
                    )}
                    <Grid
                        item
                        xs={profileOwner ? 6 : 4}
                        className={activeTab === "posts" ? classes.activeTab : classes.icon}
                    >
                        <Button
                            color="primary"
                            onClick={() => {
                                setActiveTab("posts");
                            }}
                            className={activeTab === "posts" ? classes.activeButton : undefined}
                            fullWidth
                        >
                            Posts
                        </Button>
                    </Grid>
                    <Grid
                        item
                        xs={profileOwner ? 6 : 4}
                        className={activeTab === "likes" ? classes.activeTab : classes.icon}
                    >
                        <Button
                            color="primary"
                            onClick={() => setActiveTab("likes")}
                            className={activeTab === "likes" ? classes.activeButton : undefined}
                            fullWidth
                        >
                            Likes
                        </Button>
                    </Grid>
                </Grid>
                <PostsContainer
                    posts={postsToRender()}
                    fetchLikedPosts={fetchLikedPosts}
                    activeTab={activeTab}
                    fetchFeed={fetchFeed}
                    fetchUserPosts={fetchUserPosts}
                    isLoading={isLoading}
                />
            </Grid>
        </Container>
    );
};

export default Profile;
