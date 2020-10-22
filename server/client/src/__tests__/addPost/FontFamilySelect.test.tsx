import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import FontFamilySelect from "../../components/addPost/FontFamilySelect";

describe("FontFamilySelect test", () => {
    const props = {
        fontFamily: "Roboto",
        setFontFamily: jest.fn(() => {}),
        setFontWeightValues: jest.fn(() => {}),
    };

    const wrapper = shallow(<FontFamilySelect {...props} />);
    it("renders without crash", () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
