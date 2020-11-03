import { Button, TextField } from "@material-ui/core";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import React from "react";
import SignIn, { SignInProps } from "../../components/Auth/SignIn";

describe("SignIn component", () => {
    const props: SignInProps = {
        setShowSignin: jest.fn((foo) => foo),
        signin: jest.fn(() => {}),
    };
    const wrapper = shallow(<SignIn {...props} />);
    it("renders without crash", () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it("changes showsignin value", () => {
        wrapper.find(Button).at(1).simulate("click");
        expect(props.setShowSignin).toBeCalledWith(false);
    });
});
