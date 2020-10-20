import { Avatar, Button, Container, Grid, SvgIcon, Typography, useMediaQuery } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import { useHistory } from "react-router-dom";
import { IPostInterface } from "../../../interfaces/post.interfaces";
import api from "../api";
import { AuthContext } from "./auth/AuthContext";
import PostsContainer from "./PostsContainer";

const Profile = () => {
    const history = useHistory();
    const isBigScreen = useMediaQuery("(min-width: 770px)");
    const { user, signOut } = useContext(AuthContext);
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
        <Container maxWidth="md">
            <Grid
                container
                spacing={0}
                direction="row"
                justify="space-between"
                style={!isBigScreen ? { height: "calc(100vh - 71px)" } : {width:920}}
            >
                <Grid container
                    direction="row"
                    md={2}
                    xs={12}
                    alignItems="baseline"
                    justify=/*{isBigScreen ?*/ "space-around" /* : "flex-end"}*/
                    style={!isBigScreen ? { height: 40, width: 300 } : { height:300, marginTop:50}}>

                    <Grid item md={12} sm={4}>
                        <BookmarksIcon fontSize="large" color="primary" />
                    </Grid>
                    <Grid item md={12} sm={4}>
                        <BookmarksIcon fontSize="large" color="primary" />
                    </Grid>
                    <Grid item md={12} sm={4}>
                        <BookmarksIcon fontSize="large" color="primary" />
                    </Grid>
                </Grid>
                <Grid item md={8} xs={12}>
                    <PostsContainer posts={posts} />
                </Grid>
                <Grid
                    container
                    direction="column"
                    md={2}
                    xs={12}
                    alignItems="center"
                    justify=/*{isBigScreen ?*/ "flex-start" /* : "flex-end"}*/
                    style={!isBigScreen ? { height: 48 } : {}}
                >
                    <Grid container md={12} xs={3} justify="center" /*style={isBigScreen ? {} : { marginTop: 50 }}*/>
                        <Grid item>
                            <Avatar
                                alt={`${user!.displayName}`}
                                style={isBigScreen ? { width: 100, height: 100 } : {}}
                            />
                        </Grid>
                    </Grid>
                    <Grid container md={12} xs={9} justify="center" alignContent="flex-start" spacing={1}>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={() => history.push("/add-post")}>
                                AddPost
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="secondary" onClick={signOut}>
                                Sign Out
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Profile;
