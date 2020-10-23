import { MenuItem, Select } from "@material-ui/core";
import React, { Dispatch, FunctionComponent, SetStateAction } from "react";

type FontFamilySelectProps = {
    setFontFamily: Dispatch<SetStateAction<string>>;
    setFontWeightValues: Dispatch<SetStateAction<Array<number>>>;
};

interface fontInfo {
    label: string;
    value: string;
    options: number[];
}

const FontFamilySelect: FunctionComponent<FontFamilySelectProps> = ({ setFontFamily, setFontWeightValues }) => {
    const fontFamilies: fontInfo[] = [
        {
            label: "Caveat",
            value: "Caveat",
            options: [400, 700],
        },
        {
            label: "Dancing Script",
            value: "Dancing Script",
            options: [400, 700],
        },
        {
            label: "Kalam",
            value: "Kalam",
            options: [300, 400, 700],
        },
        {
            label: "Lemonada",
            value: "Lemonada",
            options: [300, 400, 700],
        },
        {
            label: "Lobster",
            value: "Lobster",
            options: [400, 700],
        },
        {
            label: "Montserrat",
            value: "Montserrat",
            options: [100, 400, 700, 900],
        },
        {
            label: "Montserrat Alternates",
            value: "Montserrat Alternates",
            options: [100, 400, 700, 900],
        },
        {
            label: "Permanent Marker",
            value: "Permanent Marker",
            options: [400],
        },
        {
            label: "Roboto",
            value: "Roboto",
            options: [100, 400, 900],
        },
        {
            label: "Sansita Swashed",
            value: "Sansita Swashed",
            options: [400, 700, 900],
        },
    ];

    const handleChange = (index: number) => {
        setFontFamily(fontFamilies[index].value);
        setFontWeightValues(fontFamilies[index].options);
    };

    return (
        <Select fullWidth defaultValue={8} onChange={(e) => handleChange(Number(e.target.value))}>
            {fontFamilies.map((font: fontInfo, i: number) => {
                return (
                    <MenuItem value={i} key={i}>
                        {font.label}
                    </MenuItem>
                );
            })}
        </Select>
    );
};

export default FontFamilySelect;
