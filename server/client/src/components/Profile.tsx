import { Container, Grid, IconButton } from "@material-ui/core";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React, { useContext, useEffect, useState } from "react";
import { IPostInterface } from "../../../interfaces/post.interfaces";
import api from "../api";
import { AuthContext } from "./auth/AuthContext";
import PostsContainer from "./PostsContainer";

const Profile2 = () => {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState<IPostInterface[]>([]);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const result = await api.get(`posts/user/${user!._id}`);
                setPosts([...result.data.data]);
            } catch (error) {
                throw error;
            }
        };
        fetchPosts();
    }, [user]);
    return (
        <div>
            <Container maxWidth="md" style={{ display: "flex", justifyContent: "center" }}>
                <Grid container direction="column" justify="center" style={{ width: 640 }}>
                    <Grid container direction="row">
                        <Grid container xs={6} justify="center">
                            <Grid item>
                                <IconButton color="primary">
                                    <DynamicFeedIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid container xs={6} justify="center">
                            <Grid item>
                                <IconButton color="primary">
                                    <FavoriteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <PostsContainer posts={posts} />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Profile2;
