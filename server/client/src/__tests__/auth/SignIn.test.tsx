import { Button, TextField } from "@material-ui/core";
import { shallow } from "enzyme";
import React from "react";
import SignIn, { SignInProps } from "../../components/auth/SignIn";

describe("SignIn component", () => {
    const props: SignInProps = {
        email: "email",
        password: "password",
        setEmail: jest.fn(() => {}),
        setPassword: jest.fn(() => {}),
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
    it("changes email value", () => {
        wrapper
            .find(TextField)
            .at(0)
            .simulate("change", { target: { value: "email" } });
        expect(props.setEmail).toBeCalledWith("email");
    });
    it("changes password value", () => {
        wrapper
            .find(TextField)
            .at(1)
            .simulate("change", { target: { value: "password" } });
        expect(props.setPassword).toBeCalledWith("password");
    });
    it("changes showsignin value", () => {
        wrapper.find(Button).at(1).simulate("click");
        expect(props.setShowSignin).toBeCalledWith(false);
    });
    it("calls signin function", () => {
        wrapper.find(Button).at(0).simulate("click");
        expect(props.signin).toBeCalledTimes(1);
    });
});
