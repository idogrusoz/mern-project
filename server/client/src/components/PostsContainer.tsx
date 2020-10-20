import { useMediaQuery } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { IPostInterface } from "../../../interfaces/post.interfaces";
import PostDisplay from "./PostDisplay";

type PostContainerProps = {
    posts: IPostInterface[];
};

const PostsContainer: FunctionComponent<PostContainerProps> = ({ posts }): JSX.Element => {
    const isBigScreen = useMediaQuery("(min-width: 650px)");
    return (
        <div
            style={
                !isBigScreen
                    ? { height: "calc(100vh - 170px)", overflowY: "auto", overflowX: "visible" }
                    : { height: "calc(100vh - 70px)", overflowY: "auto", overflowX: "visible" }
            }
        >
            {posts.map((post: IPostInterface, i: number) => {
                return <PostDisplay post={post} key={i} />;
            })}
        </div>
    );
};

export default PostsContainer;
