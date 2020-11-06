import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { FunctionComponent, useContext } from "react";
import { useHistory } from "react-router-dom";
import { ProfileContext } from "./ProfileContext";

const useStyles = makeStyles({
    item: { textAlign: "center", marginTop: "30%" },
});

type EmptyProfileProps = {
    activeTab: "feed" | "posts" | "likes";
};

const EmptyProfile: FunctionComponent<EmptyProfileProps> = ({ activeTab }) => {
    const { profileOwner } = useContext(ProfileContext);
    const history = useHistory();
    const classes = useStyles();
    const goToAddPost = () => {
        history.push("/add-post");
    };

    const renderMessage = (): string => {
        if (activeTab === "feed") {
            return "You don't follow any users. Use search to find others and follow them so that you can see their posts on ypur feed.";
        }
        if (activeTab === "posts") {
            return (profileOwner ? profileOwner.displayName + " doesn't " : "You don't ") + "have any posts yet.";
        }
        return (profileOwner ? profileOwner.displayName + " hasn't" : "You haven't") + " liked any posts yet.";
    };
    return (
        <>
            <Grid container justify="center" alignContent="center">
                <Grid item xs={12}>
                    <Typography variant="h3" className={classes.item}>
                        {renderMessage()}
                    </Typography>
                </Grid>
                {!profileOwner && activeTab === "posts" && (
                    <Grid item xs={12} className={classes.item}>
                        <Button variant="contained" color="primary" onClick={goToAddPost}>
                            Add Post
                        </Button>
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default EmptyProfile;
