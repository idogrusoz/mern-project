import { Container, Grid, makeStyles } from "@material-ui/core";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BasePostDocument } from "../../../../interfaces/post.interfaces";
import api from "../../api";
import { AuthContext } from "../Auth/AuthContext";
import PostsContainer from "../Post/PostsContainer";
import PostTabs from "./PostTabs";
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
    const [postsToRender, setPostsToRender] = useState<BasePostDocument[]>([]);
    const [displayedId, setDisplayedId] = useState<string | null>(null);
    const classes = useStyles();
    const { pathname } = useLocation();
    const fetchFeed = useCallback(async () => {
        if (!profileOwner) {
            setIsLoading(true);
            try {
                const result = await api.get(`posts/${user?._id}/feed`);
                setFeed([...result.data.data]);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                throw error;
            }
        }
    }, [user, profileOwner]);

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

    const getProfile = useCallback(
        async (id: string): Promise<void> => {
            try {
                const response = await api.get(`/users/${id}`);
                setProfileOwner(response.data.data);
            } catch (error) {
                throw error;
            }
        },
        [setProfileOwner],
    );
    const profileToRender = useCallback(
        (id: string) => {
            if (id === user?._id) {
                setProfileOwner(null);
            } else {
                getProfile(id);
            }
        },
        [getProfile, setProfileOwner, user],
    );

    const updatePosts = useCallback(() => {
        if (activeTab === "feed") {
            setPostsToRender(feed);
        }
        if (activeTab === "posts") {
            setPostsToRender(posts);
        }
        if (activeTab === "likes") {
            setPostsToRender(likes);
        }
    }, [activeTab, feed, posts, likes]);

    useEffect(() => {
        let id: string = getProfileId(pathname);
        if (id !== displayedId) {
            setDisplayedId(id);
            if (id !== "" && id !== profileOwner?._id) {
                profileToRender(id);
            }
        }
        if (profileOwner && activeTab !== "likes") {
            setActiveTab("posts");
        }
        updatePosts();
    }, [profileOwner, activeTab, updatePosts, displayedId, pathname, profileToRender]);

    return (
        <Container maxWidth="md" className={classes.container}>
            <Grid container direction="column" justify="center" className={classes.grid}>
                <Grid item>
                    <div className={classes.container}>
                        <ProfileOwner />
                    </div>
                </Grid>
                <PostTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <PostsContainer
                    posts={postsToRender}
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
