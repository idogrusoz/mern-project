import { Button, TextField } from "@material-ui/core";
import { shallow } from "enzyme";
import React from "react";
import Register, { RegisterProps } from "../../components/auth/Register";

describe("Register component", () => {
    const props: RegisterProps = {
        register: jest.fn(() => {}),
        setShowSignin: jest.fn((foo) => foo),
    };
    const wrapper = shallow(<Register {...props} />);

    it("renders without crash", () => {
        expect(wrapper).toHaveLength(1);
    });
    it("has five text fields", () => {
        expect(wrapper.find(TextField)).toHaveLength(6);
    });

    it("changes showsignin value", () => {
        wrapper.find(Button).at(1).simulate("click");
        expect(props.setShowSignin).toBeCalledWith(true);
    });
});
