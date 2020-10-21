import { Button, TextField } from "@material-ui/core";
import { shallow } from "enzyme";
import React from "react";
import SignIn, { SignInProps } from "../../components/auth/SignIn";

describe("SignIn component", () => {
    const props: SignInProps = {
        setShowSignin: jest.fn((foo) => foo),
        signin: jest.fn(() => {}),
    };
    const wrapper = shallow(<SignIn {...props} />);
    it("renders without crash", () => {
        expect(wrapper).toHaveLength(1);
    });
    it("has two text fields", () => {
        expect(wrapper.find(TextField)).toHaveLength(2);
    });
    it("changes showsignin value", () => {
        wrapper.find(Button).at(1).simulate("click");
        expect(props.setShowSignin).toBeCalledWith(false);
    });
});
