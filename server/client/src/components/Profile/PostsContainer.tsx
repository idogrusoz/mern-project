import React, { FunctionComponent } from "react";
import { BasePostDocument } from "../../../../interfaces/post.interfaces";
import PostDisplay from "../PostDisplay";

type PostContainerProps = {
    posts: BasePostDocument[];
    fetch: () => Promise<void>;
};

const PostsContainer: FunctionComponent<PostContainerProps> = ({ posts, fetch }): JSX.Element => {
    return (
        <div>
            {posts.map((post: BasePostDocument, i: number) => {
                return <PostDisplay post={post} fetch={fetch} />;
            })}
        </div>
    );
};

export default PostsContainer;
