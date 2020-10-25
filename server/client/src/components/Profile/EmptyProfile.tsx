import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { FunctionComponent, useContext } from "react";
import { useHistory } from "react-router-dom";
import { ProfileContext } from "./ProfileContext";

const useStyles = makeStyles({
    item: { textAlign: "center", marginTop: "30%" },
});

const EmptyProfile: FunctionComponent<{}> = () => {
    const { profileOwner } = useContext(ProfileContext);
    const history = useHistory();
    const classes = useStyles();
    const goToAddPost = () => {
        history.push("/add-post");
    };
    return (
        <>
            <Grid container justify="center" alignContent="center">
                <Grid item xs={12}>
                    <Typography variant="h3" className={classes.item}>
                        {profileOwner ? profileOwner.displayName : "You"} don't have any posts yet
                    </Typography>
                </Grid>
                {!profileOwner && (
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
