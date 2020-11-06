import { Grid, makeStyles, useMediaQuery } from "@material-ui/core";
import React, { useState, useContext } from "react";
import PostCanvas from "../Post/PostCanvas";
import PostAttributes from "./PostAttributes";
import { IPostInterface } from "../../../../interfaces/post.interfaces";
import { AuthContext } from "../Auth/AuthContext";
import api from "../../api";
import { useHistory } from "react-router-dom";

const AddPost = () => {
    const { user } = useContext(AuthContext);
    const history = useHistory();
    const [textContent, setTextContent] = useState<string>("");
    const [fontFamily, setFontFamily] = useState<string>("Roboto");
    const [color, setColor] = useState<string>("#000000");
    const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
    const [fontWeight, setFontWeight] = useState<number>(400);
    const [fontSize, setFontSize] = useState<number>(16);
    const [textAlign, setTextAlign] = useState<"left" | "right" | "justify" | "center">("left");
    const [fontWeightValues, setFontWeightValues] = useState<Array<number>>([100, 400, 900]);
    const isBigScreen = useMediaQuery("(min-width: 650px)");
    const useStyles = makeStyles({
        container: {
            padding: isBigScreen ? "100px 120px" : "20px",
        },
    });
    const classes = useStyles();
    const addPost = async (): Promise<void> => {
        const post: IPostInterface = {
            author: {
                user_id: user!._id,
                userName: user!.userName,
                image: user!.image || "",
            },
            likes: [],
            textContent,
            style: {
                backgroundColor,
                color,
                fontFamily,
                fontSize,
                fontWeight,
                textAlign,
            },
        };
        try {
            await api.post("posts", post);
            history.goBack();
        } catch (error) {
            throw error;
        }
    };
    return (
        <Grid container justify="center" spacing={2} alignItems="center" direction="row" className={classes.container}>
            <Grid item md={12} lg={7}>
                <PostCanvas
                    backgroundColor={backgroundColor}
                    color={color}
                    fontFamily={fontFamily}
                    fontSize={fontSize}
                    fontWeight={fontWeight}
                    textAlign={textAlign}
                    textContent={textContent}
                />
            </Grid>
            <Grid item md={12} lg={5}>
                <PostAttributes
                    backgroundColor={backgroundColor}
                    color={color}
                    fontSize={fontSize}
                    fontWeight={fontWeight}
                    setBackgroundColor={setBackgroundColor}
                    setColor={setColor}
                    setFontFamily={setFontFamily}
                    setFontSize={setFontSize}
                    setFontWeight={setFontWeight}
                    setTextAlign={setTextAlign}
                    setTextContent={setTextContent}
                    textAlign={textAlign}
                    textContent={textContent}
                    addPost={addPost}
                    fontWeightValues={fontWeightValues}
                    setFontWeightValues={setFontWeightValues}
                />
            </Grid>
        </Grid>
    );
};

export default AddPost;
