import { TextField } from "@material-ui/core";
import React, { Dispatch, FunctionComponent, SetStateAction } from "react";

type TextContentInputProps = {
    textContent: string;
    setTextContent: Dispatch<SetStateAction<string>>;
};

const TextContentInput: FunctionComponent<TextContentInputProps> = ({ textContent, setTextContent }) => {
    return (
        <TextField
            id="standard-basic"
            label="Text"
            type="text"
            onChange={(e: { target: { value: any } }) => setTextContent(e.target.value)}
            value={textContent}
            fullWidth
        />
    );
};

export default TextContentInput;
