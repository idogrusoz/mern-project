import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import TextContentInput from "../../components/AddPost/TextContentInput";

describe("TextContentInput test", () => {
    const props = {
        textContent: "",
        setTextContent: jest.fn(() => {}),
    };

    const wrapper = shallow(<TextContentInput {...props} />);
    it("renders without crash", () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
