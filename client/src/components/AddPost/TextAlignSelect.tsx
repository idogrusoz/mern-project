import { MenuItem, Select } from "@material-ui/core";
import React, { ChangeEvent, Dispatch, FunctionComponent, SetStateAction } from "react";
import { capitalizeFirst } from "../../utils";

type TextAlignSelectProps = {
    textAlign: "left" | "right" | "justify" | "center";
    setTextAlign: Dispatch<SetStateAction<"left" | "right" | "justify" | "center">>;
};

const TextAlignSelect: FunctionComponent<TextAlignSelectProps> = ({ textAlign, setTextAlign }) => {
    const textAlignValues = ["left", "right", "justify", "center"];
    const handleChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
        const value: "left" | "right" | "justify" | "center" = e.target.value as
            | "left"
            | "right"
            | "justify"
            | "center";
        setTextAlign(value);
    };
    return (
        <Select defaultValue={textAlign} onChange={handleChange} fullWidth>
            {textAlignValues.map((value: string, i: number) => {
                return (
                    <MenuItem value={value} key={i}>
                        {capitalizeFirst(value)}
                    </MenuItem>
                );
            })}
        </Select>
    );
};

export default TextAlignSelect;
