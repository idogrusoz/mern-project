import { Button, TextField } from "@material-ui/core";
import { shallow } from "enzyme";
import React from "react";
import Register, { RegisterProps } from "../../components/auth/Register";

describe("Register component", () => {
    const props: RegisterProps = {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        password2: "",
        register: jest.fn(() => {}),
        setEmail: jest.fn(() => {}),
        setFirstName: jest.fn(() => {}),
        setLastName: jest.fn(() => {}),
        setPassword: jest.fn(() => {}),
        setPassword2: jest.fn(() => {}),
        setShowSignin: jest.fn((foo) => foo),
    };
    const wrapper = shallow(<Register {...props} />);
    it("renders without crash", () => {
        expect(wrapper).toHaveLength(1);
    });
    it("has five text fields", () => {
        expect(wrapper.find(TextField)).toHaveLength(5);
    });
    it("changes firstName value", () => {
        wrapper
            .find(TextField)
            .at(0)
            .simulate("change", { target: { value: "firstName" } });
        expect(props.setFirstName).toBeCalledWith("firstName");
    });
    it("changes lastName value", () => {
        wrapper
            .find(TextField)
            .at(1)
            .simulate("change", { target: { value: "lastName" } });
        expect(props.setLastName).toBeCalledWith("lastName");
    });
    it("changes email value", () => {
        wrapper
            .find(TextField)
            .at(2)
            .simulate("change", { target: { value: "email" } });
        expect(props.setEmail).toBeCalledWith("email");
    });
    it("changes password value", () => {
        wrapper
            .find(TextField)
            .at(3)
            .simulate("change", { target: { value: "password" } });
        expect(props.setPassword).toBeCalledWith("password");
    });
    it("changes password2 value", () => {
        wrapper
            .find(TextField)
            .at(4)
            .simulate("change", { target: { value: "password2" } });
        expect(props.setPassword2).toBeCalledWith("password2");
    });
    it("changes showsignin value", () => {
        wrapper.find(Button).at(1).simulate("click");
        expect(props.setShowSignin).toBeCalledWith(true);
    });
    it("calls signin function", () => {
        wrapper.find(Button).at(0).simulate("click");
        expect(props.register).toBeCalledTimes(1);
    });
});
