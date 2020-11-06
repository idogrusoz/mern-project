import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, makeStyles } from "@material-ui/core";
import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { BasePostDocument } from "../../../../interfaces/post.interfaces";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PostCanvas from "./PostCanvas";
import { AuthContext } from "../Auth/AuthContext";
import api from "../../api";
import { ProfileContext } from "../Profile/ProfileContext";
import { useHistory } from "react-router-dom";

export type PostDisplayProps = {
    post: BasePostDocument;
    fetch: () => Promise<void>;
};

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 640,
    },
    icon: {
        color: theme.palette.secondary.dark,
    },
    header: {
        cursor: "pointer",
    },
}));

const PostDisplay: FunctionComponent<PostDisplayProps> = ({ post, fetch }) => {
    const classes = useStyles();
    const { user } = useContext(AuthContext);
    const { profileOwner } = useContext(ProfileContext);
    const { style, textContent, likes } = post;
    const { backgroundColor, color, fontFamily, fontSize, fontWeight, textAlign } = style;
    const [liked, setLiked] = useState<boolean | null>(null);
    const { push } = useHistory();
    const handleLike = async () => {
        try {
            const response = await api.put(`/posts/${post._id}/like`, { like: !liked });
            if (!response.data.error) {
                setLiked(response.data.data.likes.indexOf(user!._id) > -1);
                if (!profileOwner) {
                    fetch();
                }
            }
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        const like = likes.indexOf(user!._id) > -1;
        setLiked(like);
    }, [likes, user, post._id]);

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={<Avatar aria-label="recipe" src={post.author.image} />}
                title={post.author.userName}
                subheader={
                    new Date(post.createdAt!).toDateString() + " " + new Date(post.createdAt!).toLocaleTimeString()
                }
                onClick={() => push(`${post.author.user_id}`)}
                className={classes.header}
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
            <CardActions disableSpacing>
                <IconButton aria-label="like" onClick={handleLike} className={classes.icon}>
                    {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default PostDisplay;
