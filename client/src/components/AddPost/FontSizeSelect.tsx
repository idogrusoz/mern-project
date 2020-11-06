import { MenuItem, Select } from "@material-ui/core";
import React, { Dispatch, FunctionComponent, SetStateAction } from "react";

type FontSizeSelectProps = {
    fontSize: number;
    setFontSize: Dispatch<SetStateAction<number>>;
};

const FontSizeSelect: FunctionComponent<FontSizeSelectProps> = ({ fontSize, setFontSize }) => {
    const fontSizes: number[] = [16, 20, 22, 24, 28, 32, 36, 40, 48, 56, 64, 72, 144];
    return (
        <Select fullWidth defaultValue={fontSize} onChange={(e) => setFontSize(Number(e.target.value))}>
            {fontSizes.map((size: number, i: number) => {
                return (
                    <MenuItem value={size} key={i}>
                        {size}
                    </MenuItem>
                );
            })}
        </Select>
    );
};

export default FontSizeSelect;
