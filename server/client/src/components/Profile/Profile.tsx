import { Button, Container, Grid, makeStyles } from "@material-ui/core";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { BasePostDocument } from "../../../../interfaces/post.interfaces";
import api from "../../api";
import { AuthContext } from "../Auth/AuthContext";
import EmptyProfile from "./EmptyProfile";
import PostsContainer from "./PostsContainer";
import { ProfileContext } from "./ProfileContext";
import ProfileOwner from "./ProfileOwner";

const useStyles = makeStyles((theme) => ({
    container: { display: "flex", justifyContent: "center" },
    grid: { width: 640 },
    icon: {
        textAlign: "center",
    },
    active: {
        textAlign: "center",
        backgroundColor: theme.palette.primary.dark,
    },
}));

const Profile = () => {
    const { user } = useContext(AuthContext);
    const { profileOwner } = useContext(ProfileContext);
    const [feed, setFeed] = useState<BasePostDocument[]>([]);
    const [posts, setPosts] = useState<BasePostDocument[]>([]);
    const [likes, setLikes] = useState<BasePostDocument[]>([]);
    const [activeTab, setActiveTab] = useState<"feed" | "posts" | "likes">("feed");
    const classes = useStyles();

    const fetchFeed = useCallback(async () => {
        try {
            const result = await api.get(`posts/${user?._id}/feed`);
            setFeed([...result.data.data]);
        } catch (error) {
            throw error;
        }
    }, [user]);

    const fetchUserPosts = useCallback(async () => {
        const id = profileOwner ? profileOwner._id : user?._id;
        try {
            const result = await api.get(`posts/user/${id}`);
            setPosts([...result.data.data]);
        } catch (error) {
            throw error;
        }
    }, [profileOwner, user]);

    const fetchLikedPosts = useCallback(async () => {
        const id = profileOwner ? profileOwner._id : user?._id;
        try {
            const result = await api.get(`/posts/likedbyuser/${id}`);
            setLikes([...result.data.data]);
        } catch (error) {
            throw error;
        }
    }, [profileOwner, user]);

    useEffect(() => {
        if (!profileOwner) {
            fetchFeed();
        }
        fetchUserPosts();
        fetchLikedPosts();
        if (profileOwner) {
            setActiveTab("posts");
        } else {
            setActiveTab("feed");
        }
    }, [profileOwner, user, fetchFeed, fetchUserPosts, fetchLikedPosts]);

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
                        <Grid item xs={4} className={activeTab === "feed" ? classes.active : classes.icon}>
                            <Button
                                color="primary"
                                onClick={() => {
                                    fetchFeed();
                                    setActiveTab("feed");
                                }}
                                style={activeTab === "feed" ? { color: "#ffffff" } : {}}
                                fullWidth
                            >
                                Feed
                            </Button>
                        </Grid>
                    )}
                    <Grid
                        item
                        xs={profileOwner ? 6 : 4}
                        className={activeTab === "posts" ? classes.active : classes.icon}
                    >
                        <Button
                            color="primary"
                            onClick={() => {
                                fetchUserPosts();
                                setActiveTab("posts");
                            }}
                            style={activeTab === "posts" ? { color: "#ffffff" } : {}}
                            fullWidth
                        >
                            Posts
                        </Button>
                    </Grid>
                    <Grid
                        item
                        xs={profileOwner ? 6 : 4}
                        className={activeTab === "likes" ? classes.active : classes.icon}
                    >
                        <Button
                            color="primary"
                            onClick={() => setActiveTab("likes")}
                            style={activeTab === "likes" ? { color: "#ffffff" } : {}}
                            fullWidth
                        >
                            Likes
                        </Button>
                    </Grid>
                </Grid>
                {posts.length > 0 ? (
                    <Grid item>
                        <PostsContainer posts={postsToRender()} fetch={fetchLikedPosts} />
                    </Grid>
                ) : (
                    <EmptyProfile />
                )}
            </Grid>
        </Container>
    );
};

export default Profile;
