import { Avatar, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { SearchedUser } from "../../../../interfaces/user.interfaces";

const useStyles = makeStyles({
    result: {
        marginTop: 10,
        overflow: "hidden",
        "&:hover": {
            backgroundColor: "#ffffff",
            cursor: "pointer",
        },
    },
});

export type SingleSearchResultProps = {
    user: SearchedUser;
    pickUser: (user: SearchedUser) => void;
};

const SingleSearchResult: FunctionComponent<SingleSearchResultProps> = ({ user, pickUser }) => {
    const classes = useStyles();
    return (
        <Grid container alignItems="center" onClick={() => pickUser(user)} className={classes.result}>
            <Grid item xs={3}>
                <Avatar src={user.image} />
            </Grid>
            <Grid item xs={9}>
                <Typography>{user.userName}</Typography>
            </Grid>
        </Grid>
    );
};

export default SingleSearchResult;
