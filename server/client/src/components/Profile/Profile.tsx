import { Container, Grid, IconButton, makeStyles } from "@material-ui/core";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React, { useContext, useEffect, useState } from "react";
import { IPostInterface } from "../../../../interfaces/post.interfaces";
import api from "../../api";
import { AuthContext } from "../Auth/AuthContext";
import EmptyProfile from "./EmptyProfile";
import PostsContainer from "./PostsContainer";
import { ProfileContext } from "./ProfileContext";
import ProfileOwner from "./ProfileOwner";

const useStyles = makeStyles({
    container: { display: "flex", justifyContent: "center" },
    grid: { width: 640 },
    icon: {
        textAlign: "center",
    },
});

const Profile = () => {
    const { user } = useContext(AuthContext);
    const { profileOwner } = useContext(ProfileContext);
    const [posts, setPosts] = useState<IPostInterface[]>([]);
    const classes = useStyles();

    useEffect(() => {
        const fetchPosts = async () => {
            const id = profileOwner ? profileOwner._id : user?._id;
            try {
                const result = await api.get(`posts/user/${id}`);
                setPosts([...result.data.data]);
            } catch (error) {
                throw error;
            }
        };
        fetchPosts();
    }, [profileOwner, user]);
    return (
        <Container maxWidth="md" className={classes.container}>
            <Grid container direction="column" justify="center" className={classes.grid}>
                <Grid item>
                    <div className={classes.container}>
                        <ProfileOwner />
                    </div>
                </Grid>
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
