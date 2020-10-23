import { Button, TextField } from "@material-ui/core";
import toJson from "enzyme-to-json";
import { mount, ReactWrapper } from "enzyme";
import React from "react";
import Landing from "../../components/Auth/Landing";

describe("Landing component", () => {
    let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
    beforeEach(() => {
        wrapper = mount(<Landing />);
    });
    it("renders without crashing", () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it("renders switches between signin ad register", () => {
        expect(wrapper.find(TextField)).toHaveLength(2);
        wrapper.find(Button).at(1).simulate("click");
        expect(wrapper.find(TextField)).toHaveLength(6);
    });
});
