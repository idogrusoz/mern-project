import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import PostCanvas from "../components/PostCanvas";

describe("PostCanvas test", () => {
    const props = {
        textContent: "",
        fontFamily: "Roboto",
        color: "#ffffff",
        backgroundColor: "#ffffff",
        fontWeight: 400,
        fontSize: 40,
        textAlign: "left" as "left" | "right" | "justify" | "center",
    };

    const wrapper = shallow(<PostCanvas {...props} />);
    it("renders without crash", () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
