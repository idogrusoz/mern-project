import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import ColorSelect from "../../components/AddPost/ColorSelect";

describe("ColorSelect test", () => {
    const props = {
        label: "label",
        color: "#ffffff",
        setColor: jest.fn(() => {}),
    };

    const wrapper = shallow(<ColorSelect {...props} />);
    it("renders without crash", () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
