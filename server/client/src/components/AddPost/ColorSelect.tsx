import { Typography } from "@material-ui/core";
import React, { Dispatch, FunctionComponent, SetStateAction } from "react";
import { SliderPicker, ColorResult } from "react-color";

type ColorSelectProps = {
    label: string;
    color: string;
    setColor: Dispatch<SetStateAction<string>>;
};

const ColorSelect: FunctionComponent<ColorSelectProps> = ({ label, color, setColor }) => {
    return (
        <>
            <Typography variant="caption">{label}</Typography>
            <SliderPicker color={color} onChangeComplete={(color: ColorResult) => setColor(color.hex)} />
        </>
    );
};

export default ColorSelect;
