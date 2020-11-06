import { Avatar, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { FunctionComponent, useContext } from "react";
import api from "../../api";
import { AuthContext } from "../Auth/AuthContext";
import { ProfileContext } from "./ProfileContext";

const useStyle = makeStyles({
    buttonWrapper: {
        textAlign: "center",
    },
});

const ProfileOwner: FunctionComponent<{}> = () => {
    const { user } = useContext(AuthContext);
    const { profileOwner, setProfileOwner } = useContext(ProfileContext);
    const classes = useStyle();

    const handleFollow = async () => {
        try {
            const response = await api.put(`users/${profileOwner?._id}/follow`);
            if (response.data.error) {
                throw new Error(response.data.message);
            }
            setProfileOwner(response.data.data);
        } catch (error) {
            throw error;
        }
    };

    const handleUnfollow = async () => {
        try {
            const response = await api.put(`users/${profileOwner?._id}/unfollow`);
            if (response.data.error) {
                throw new Error(response.data.message);
            }
            setProfileOwner(response.data.data);
        } catch (error) {
            throw error;
        }
    };

    return (
        profileOwner && (
            <Grid container alignItems="center">
                <Grid item xs={2}>
                    <Avatar src={profileOwner.image} />
                </Grid>
                <Grid item xs={6}>
                    <Grid item>
                        <Typography variant="body1">{profileOwner.displayName}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2">{profileOwner.userName}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={4} className={classes.buttonWrapper}>
                    {profileOwner.followers?.indexOf(user!._id) === -1 ? (
                        <Button color="primary" variant="contained" onClick={handleFollow}>
                            FOLLOW
                        </Button>
                    ) : (
                        <Button color="secondary" variant="contained" onClick={handleUnfollow}>
                            UNFOLLOW
                        </Button>
                    )}
                </Grid>
            </Grid>
        )
    );
};

export default ProfileOwner;
