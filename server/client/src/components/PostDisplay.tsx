import { Avatar, Card, CardContent, CardHeader, makeStyles } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { IPostInterface } from "../../../interfaces/post.interfaces";
import PostCanvas from "./PostCanvas";

type PostDisplayProps = {
    post: IPostInterface;
};

const useStyles = makeStyles({
    card: {
        maxWidth: 640,
    },
});

const PostDisplay: FunctionComponent<PostDisplayProps> = ({ post }) => {
    const classes = useStyles();
    const { style, textContent } = post;
    const { backgroundColor, color, fontFamily, fontSize, fontWeight, textAlign } = style;
    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={<Avatar aria-label="recipe" src={post.author.image} />}
                title={post.author.userName}
                subheader={
                    new Date(post.updatedAt!).toDateString() + " " + new Date(post.updatedAt!).toLocaleTimeString()
                }
            />
            <CardContent>
                <PostCanvas
                    backgroundColor={backgroundColor}
                    color={color}
                    fontFamily={fontFamily}
                    fontSize={fontSize}
                    fontWeight={fontWeight}
                    textAlign={textAlign as "left" | "right" | "justify" | "center"}
                    textContent={textContent}
                />
            </CardContent>
        </Card>
    );
};

export default PostDisplay;
