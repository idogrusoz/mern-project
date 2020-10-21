import { Grid, Paper, Typography, useMediaQuery } from "@material-ui/core";
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

    return (
        <Grid container justify="center">
            <Grid item md={12} justify="center">
                <Paper
                    elevation={3}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                        width: !isBigScreen ? 330 : 600,
                        height: !isBigScreen ? 220 : 400,
                        backgroundColor,
                        margin: "auto",
                    }}
                >
                    <Typography
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden",
                            width: !isBigScreen ? 330 : 600,
                            height: !isBigScreen ? 220 : 400,
                            fontFamily,
                            color,
                            fontWeight,
                            fontSize,
                            margin: "auto",
                            textAlign,
                        }}
                    >
                        {textContent}
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default PostCanvas;
