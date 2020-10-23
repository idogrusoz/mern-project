import React, { FunctionComponent } from "react";
import { IPostInterface } from "../../../../interfaces/post.interfaces";
import PostDisplay from "../PostDisplay";

type PostContainerProps = {
    posts: IPostInterface[];
};

const PostsContainer: FunctionComponent<PostContainerProps> = ({ posts }): JSX.Element => {
    return (
        <div>
            {posts.map((post: IPostInterface, i: number) => {
                return <PostDisplay post={post} key={i} />;
            })}
        </div>
    );
};

export default PostsContainer;
