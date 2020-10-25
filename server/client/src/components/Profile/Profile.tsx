import { Button, Container, Grid, makeStyles } from "@material-ui/core";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { IPostInterface } from "../../../../interfaces/post.interfaces";
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
    const [posts, setPosts] = useState<IPostInterface[]>([]);
    const [activeTab, setActiveTab] = useState<"feed" | "posts" | "likes">("feed");
    const classes = useStyles();

    const fetchFeed = useCallback(async () => {
        try {
            const result = await api.get(`posts/${user?._id}/feed`);
            setPosts([...result.data.data]);
        } catch (error) {
            throw error;
        }
    }, [user]);

    const fetchUserPosts = useCallback(async () => {
        const id = profileOwner ? profileOwner._id : user?._id;
        console.log("id", id);
        console.log("profileOwner.userName", profileOwner?.userName);
        try {
            const result = await api.get(`posts/user/${id}`);
            setPosts([...result.data.data]);
        } catch (error) {
            throw error;
        }
    }, [profileOwner, user]);

    useEffect(() => {
        if (activeTab === "feed") {
            fetchFeed();
        }
        if (activeTab === "posts") {
            fetchUserPosts();
        }
    }, [profileOwner, user, activeTab, fetchFeed, fetchUserPosts]);

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
                                onClick={() => setActiveTab("feed")}
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
                            onClick={() => setActiveTab("posts")}
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
                        <PostsContainer posts={posts} />
                    </Grid>
                ) : (
                    <EmptyProfile />
                )}
            </Grid>
        </Container>
    );
};

export default Profile;
