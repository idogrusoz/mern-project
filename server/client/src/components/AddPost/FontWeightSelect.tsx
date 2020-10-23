import { MenuItem, Select } from "@material-ui/core";
import React, { Dispatch, FunctionComponent, SetStateAction, useEffect } from "react";

type FontWeightSelectProps = {
    fontWeightValues: number[];
    fontWeight: number;
    setFontWeight: Dispatch<SetStateAction<number>>;
};

const FontWeightSelect: FunctionComponent<FontWeightSelectProps> = ({
    fontWeight,
    fontWeightValues,
    setFontWeight,
}) => {
    useEffect(() => {
        if (fontWeightValues.indexOf(fontWeight) === -1) {
            setFontWeight(fontWeightValues[0]);
        }
    }, [fontWeight, setFontWeight, fontWeightValues]);
    return (
        <Select fullWidth onChange={(e) => setFontWeight(Number(e.target.value))} value={fontWeight}>
            {fontWeightValues.map((value: number, i: number) => {
                return (
                    <MenuItem value={value} key={i}>
                        {value}
                    </MenuItem>
                );
            })}
        </Select>
    );
};

export default FontWeightSelect;
