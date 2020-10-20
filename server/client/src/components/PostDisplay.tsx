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
        <div>
            <PostCanvas
                backgroundColor={backgroundColor}
                color={color}
                fontFamily={fontFamily}
                fontSize={fontSize}
                fontWeight={fontWeight}
                textAlign={textAlign as "left" | "right" | "justify" | "center"}
                textContent={textContent}
            />
        </div>
    );
};

export default PostDisplay;
