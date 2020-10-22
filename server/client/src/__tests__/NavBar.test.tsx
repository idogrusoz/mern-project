import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import NavBar from "../components/NavBar";

describe("NavBar test", () => {
    const wrapper = shallow(<NavBar />);
    it("renders without crash", () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
