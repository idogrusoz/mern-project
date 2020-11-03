import { CircularProgress } from "@material-ui/core";
import React, { FunctionComponent, useEffect } from "react";
import { BasePostDocument } from "../../../../interfaces/post.interfaces";
import PostDisplay from "./PostDisplay";
import EmptyProfile from "../Profile/EmptyProfile";

export type PostContainerProps = {
    posts: BasePostDocument[];
    fetchLikedPosts: () => Promise<void>;
    fetchFeed: () => Promise<void>;
    fetchUserPosts: () => Promise<void>;
    activeTab: "feed" | "posts" | "likes";
    isLoading: boolean;
};

const PostsContainer: FunctionComponent<PostContainerProps> = ({
    posts,
    fetchLikedPosts,
    fetchFeed,
    fetchUserPosts,
    activeTab,
    isLoading,
}): JSX.Element => {
    useEffect(() => {
        if (activeTab === "feed") {
            fetchFeed();
        }
        if (activeTab === "posts") {
            fetchUserPosts();
        }
        if (activeTab === "likes") {
            fetchLikedPosts();
        }
    }, [activeTab, fetchFeed, fetchUserPosts, fetchLikedPosts]);
    return isLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
        </div>
    ) : (
        <>
            {posts.length > 0 ? (
                posts.map((post: BasePostDocument, i: number) => {
                    return <PostDisplay post={post} fetch={fetchLikedPosts} key={i} />;
                })
            ) : (
                <EmptyProfile activeTab={activeTab} />
            )}
        </>
    );
};

export default PostsContainer;
