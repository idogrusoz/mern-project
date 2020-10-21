import { Button, TextField } from "@material-ui/core";
import { mount, ReactWrapper } from "enzyme";
import React from "react";
import Landing from "../../components/auth/Landing";

describe("Landing component", () => {
    let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
    beforeEach(() => {
        wrapper = mount(<Landing />);
    });
    it("renders without crashing", () => {
        expect(wrapper).toMatchSnapshot();
    });
    it("renders switches between signin ad register", () => {
        expect(wrapper.find(TextField)).toHaveLength(2);
        wrapper.find(Button).at(1).simulate("click");
        expect(wrapper.find(TextField)).toHaveLength(6);
    });
});
