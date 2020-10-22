import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import FontWeightSelect from "../../components/addPost/FontWeightSelect";

describe("FontWeightSelect test", () => {
    const props = {
        fontWeight: 400,
        setFontWeight: jest.fn(() => {}),
        fontWeightValues: [400, 600],
    };

    const wrapper = shallow(<FontWeightSelect {...props} />);
    it("renders without crash", () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
