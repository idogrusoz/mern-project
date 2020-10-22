import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import FontSizeSelect from "../../components/addPost/FontSizeSelect";

describe("FontSizeSelect test", () => {
    const props = {
        fontSize: 40,
        setFontSize: jest.fn(() => {}),
    };

    const wrapper = shallow(<FontSizeSelect {...props} />);
    it("renders without crash", () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
