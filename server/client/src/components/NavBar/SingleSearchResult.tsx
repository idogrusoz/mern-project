import { Avatar, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { SearchedUser } from "../../../../interfaces/user.interfaces";

const useStyles = makeStyles({
    result: {
        marginTop: 10,
        "&:hover": {
            backgroundColor: "#ffffff",
            cursor: "pointer",
        },
    },
});

type SingleSearchResultProps = {
    user: SearchedUser;
};

const SingleSearchResult: FunctionComponent<SingleSearchResultProps> = ({ user }) => {
    const classes = useStyles();
    return (
        <Grid container alignItems="center" style={{ marginTop: 10 }} className={classes.result}>
            <Grid item xs={3}>
                <Avatar src={user.image} onClick={() => console.log(user._id)} />
            </Grid>
            <Grid item xs={9}>
                <Typography onClick={() => console.log(user._id)}>{user.userName}</Typography>
            </Grid>
        </Grid>
    );
};

export default SingleSearchResult;
