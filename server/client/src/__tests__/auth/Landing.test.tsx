jest.mock("../../api.ts");
import { Button, TextField } from "@material-ui/core";
import { act } from "@testing-library/react";
import { mount, ReactWrapper } from "enzyme";
import React from "react";
import api from "../../api";
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
        expect(wrapper.find(TextField)).toHaveLength(5);
    });
    it("signs in the user", async () => {
        const button = wrapper.find(Button).first();
        expect(button.text()).toBe("Sign In");
        const click = async () => {
            await button.simulate("click");
        };
        await act(click);
        expect(api.post).toBeCalled();
    });
    it("signs in the user", async () => {
        const button = wrapper.find(Button).at(1);
        button.simulate("click");
        const registerButton = wrapper.find(Button).first();
        expect(registerButton.text()).toBe("Register");
        const click = async () => {
            await registerButton.simulate("click");
        };
        await act(click);
        expect(api.post).toBeCalled();
    });
});
