import { Button, Container, Grid, makeStyles } from "@material-ui/core";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BasePostDocument } from "../../../../interfaces/post.interfaces";
import api from "../../api";
import { AuthContext } from "../Auth/AuthContext";
import PostsContainer from "../Post/PostsContainer";
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
    const { profileOwner, setProfileOwner } = useContext(ProfileContext);
    const [feed, setFeed] = useState<BasePostDocument[]>([]);
    const [posts, setPosts] = useState<BasePostDocument[]>([]);
    const [likes, setLikes] = useState<BasePostDocument[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<"feed" | "posts" | "likes">("feed");
    const classes = useStyles();
    const location = useLocation();
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

    const getProfileId = (path: string): string => {
        let arr = path.split("/");
        const index = arr.indexOf("profile");
        if (index !== -1) {
            return arr[index + 1];
        }
        return "";
    };

    const getProfile = async (id: string): Promise<void> => {
        try {
            const response = await api.get(`/users/${id}`);
            console.log("response", response);
            setProfileOwner(response.data.data);
        } catch (error) {
            throw error;
        }
    };

    const profileToRender = (id: string) => {
        if (id === user?._id) {
            setProfileOwner(null);
        } else {
            console.log("id", id);
            getProfile(id);
        }
    };

    useEffect(() => {
        let id: string = getProfileId(location.pathname);
        if (id !== "" && id !== profileOwner?._id) {
            console.log("id", id);
            profileToRender(id);
        }
        if (profileOwner) {
            setActiveTab("posts");
        }
    }, [profileOwner, location]);

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
