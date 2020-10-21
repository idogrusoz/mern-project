import { Container, Grid, IconButton, makeStyles } from "@material-ui/core";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IPostInterface } from "../../../interfaces/post.interfaces";
import api from "../api";
import { AuthContext } from "./auth/AuthContext";
import PostsContainer from "./PostsContainer";

const useStyles = makeStyles({
    container: { display: "flex", justifyContent: "center" },
    grid: { width: 640 },
    icon: {
        textAlign: "center",
    },
});

const Profile = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const [posts, setPosts] = useState<IPostInterface[]>([]);
    const classes = useStyles();

    const profileId = (): string => {
        let profileId = location.pathname.replace("/", "");
        if (profileId === "/") {
            profileId += user!._id;
        }
        return profileId;
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const result = await api.get(`posts/user/${profileId()}`);
                setPosts([...result.data.data]);
            } catch (error) {
                throw error;
            }
        };
        fetchPosts();
    }, [user]);
    return (
        <Container maxWidth="md" className={classes.container}>
            <Grid container direction="column" justify="center" className={classes.grid}>
                <Grid container direction="row">
                    <Grid item xs={6} className={classes.icon}>
                        <IconButton color="primary">
                            <DynamicFeedIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={6} className={classes.icon}>
                        <IconButton color="primary">
                            <FavoriteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item>
                    <PostsContainer posts={posts} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Profile;
