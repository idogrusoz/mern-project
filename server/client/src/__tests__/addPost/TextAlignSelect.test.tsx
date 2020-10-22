import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import TextAlignSelect from "../../components/addPost/TextAlignSelect";

describe("TextAlignSelect test", () => {
    const props = {
        textAlign: "left" as "left" | "right" | "center" | "justify",
        setTextAlign: jest.fn(() => {}),
    };

    const wrapper = shallow(<TextAlignSelect {...props} />);
    it("renders without crash", () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
