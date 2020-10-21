import { Avatar, Card, CardContent, CardHeader } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { IPostInterface } from "../../../interfaces/post.interfaces";
import PostCanvas from "./PostCanvas";

type PostDisplayProps = {
    post: IPostInterface;
};

const PostDisplay: FunctionComponent<PostDisplayProps> = ({ post }) => {
    const { style, textContent } = post;
    const { backgroundColor, color, fontFamily, fontSize, fontWeight, textAlign } = style;
    return (
        <Card style={{ maxWidth: 640 }}>
            <CardHeader
                avatar={<Avatar aria-label="recipe" />}
                title={post.user_id}
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
