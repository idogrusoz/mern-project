import { Avatar, Grid, Typography } from "@material-ui/core";
import React, { FunctionComponent, useContext } from "react";
import { ProfileContext } from "./ProfileContext";

const ProfileOwner: FunctionComponent<{}> = () => {
    const { profileOwner } = useContext(ProfileContext);
    return (
        profileOwner && (
            <Grid container>
                <Grid item xs={3}>
                    <Avatar src={profileOwner.image} />
                </Grid>
                <Grid item xs={9}>
                    <Grid item>
                        <Typography variant="body1">{profileOwner.displayName}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2">{profileOwner.userName}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        )
    );
};

export default ProfileOwner;
