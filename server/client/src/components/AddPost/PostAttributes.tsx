import { Button, Grid, makeStyles, useMediaQuery } from "@material-ui/core";
import React, { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import { useHistory } from "react-router-dom";
import ColorSelect from "./ColorSelect";
import FontFamilySelect from "./FontFamilySelect";
import FontSizeSelect from "./FontSizeSelect";
import FontWeightSelect from "./FontWeightSelect";
import TextAlignSelect from "./TextAlignSelect";
import TextContentInput from "./TextContentInput";

export type PostAttributesProps = {
    textContent: string;
    setTextContent: Dispatch<SetStateAction<string>>;
    fontFamily: string;
    setFontFamily: Dispatch<SetStateAction<string>>;
    color: string;
    setColor: Dispatch<SetStateAction<string>>;
    backgroundColor: string;
    setBackgroundColor: Dispatch<SetStateAction<string>>;
    fontWeight: number;
    setFontWeight: Dispatch<SetStateAction<number>>;
    fontSize: number;
    setFontSize: Dispatch<SetStateAction<number>>;
    textAlign: "left" | "right" | "justify" | "center";
    setTextAlign: Dispatch<SetStateAction<"left" | "right" | "justify" | "center">>;
    addPost: () => Promise<void>;
};

const PostAttributes: FunctionComponent<PostAttributesProps> = ({
    textContent,
    setTextContent,
    fontFamily,
    setFontFamily,
    color,
    setColor,
    backgroundColor,
    setBackgroundColor,
    fontWeight,
    setFontWeight,
    fontSize,
    setFontSize,
    textAlign,
    setTextAlign,
    addPost,
}) => {
    const [fontWeightValues, setFontWeightValues] = useState<Array<number>>([100, 400, 900]);
    const history = useHistory();
    const isBigScreen = useMediaQuery("(min-width: 650px)");
    const useStyles = makeStyles({
        container: isBigScreen
            ? {
                  maxWidth: "500px",
                  margin: "auto",
              }
            : { marginTop: 30 },
    });
    const classes = useStyles();
    return (
        <Grid container direction="row" spacing={5} className={classes.container}>
            <Grid container justify="space-around" direction="row">
                <Grid item xs={6}>
                    <Grid container justify="center">
                        <Grid item>
                            <Button color="primary" variant="contained" onClick={addPost}>
                                Share
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container justify="center">
                        <Grid item>
                            <Button color="secondary" variant="contained" onClick={() => history.goBack()}>
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <TextContentInput textContent={textContent} setTextContent={setTextContent} />
            </Grid>
            <Grid item xs={6}>
                <FontFamilySelect setFontFamily={setFontFamily} setFontWeightValues={setFontWeightValues} />
            </Grid>
            <Grid item xs={6}>
                <FontWeightSelect
                    fontWeight={fontWeight}
                    setFontWeight={setFontWeight}
                    fontWeightValues={fontWeightValues}
                />
            </Grid>
            <Grid item xs={6}>
                <FontSizeSelect fontSize={fontSize} setFontSize={setFontSize} />
            </Grid>
            <Grid item xs={6}>
                <TextAlignSelect textAlign={textAlign} setTextAlign={setTextAlign} />
            </Grid>

            <Grid item lg={6} xs={12}>
                <ColorSelect label="Color" color={color} setColor={setColor} />
            </Grid>
            <Grid item lg={6} xs={12}>
                <ColorSelect label="Backgound Color" color={backgroundColor} setColor={setBackgroundColor} />
            </Grid>
        </Grid>
    );
};

export default PostAttributes;
