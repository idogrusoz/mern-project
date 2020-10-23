import { Grid, Paper, Typography, useMediaQuery, makeStyles } from "@material-ui/core";
import React, { FunctionComponent } from "react";

type PostCanvasType = {
    textContent: string;
    fontFamily: string;
    color: string;
    backgroundColor: string;
    fontWeight: number;
    fontSize: number;
    textAlign: "left" | "right" | "justify" | "center";
};

const PostCanvas: FunctionComponent<PostCanvasType> = ({
    backgroundColor,
    color,
    fontFamily,
    fontSize,
    fontWeight,
    textAlign,
    textContent,
}) => {
    const isBigScreen = useMediaQuery("(min-width: 650px)");
    const useStyles = makeStyles({
        wrapper: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            width: !isBigScreen ? 330 : 600,
            height: !isBigScreen ? 220 : 400,
            backgroundColor,
            margin: "auto",
        },
        text: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            width: !isBigScreen ? 330 : 600,
            height: !isBigScreen ? 220 : 400,
            fontFamily,
            color,
            fontWeight,
            fontSize: isBigScreen ? fontSize : fontSize * 0.55,
            margin: "auto",
            textAlign,
        },
    });
    const classes = useStyles();

    return (
        <Grid container justify="center">
            <Grid item md={12}>
                <Paper elevation={3} className={classes.wrapper}>
                    <Typography className={classes.text}>{textContent}</Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default PostCanvas;
