jest.mock("../../api.ts");
import React from "react";
import toJson from "enzyme-to-json";
import { mount, shallow } from "enzyme";
import api from "../../api";
import AddPost from "../../components/addPost/AddPost";
import { Button } from "@material-ui/core";
import { AuthContext, AuthContextObject, defaultContextValue } from "../../components/auth/AuthContext";
import { MemoryRouter } from "react-router-dom";

describe("AddPost test", () => {
    const value: AuthContextObject = {
        ...defaultContextValue,
        user: {
            _id: "userId",
            firstName: "firstName",
            lastName: "lastName",
            displayName: "displayName",
            userName: "userName",
            email: "email",
        },
        // isAuthenticated: jest.fn(() => Promise.resolve()),
        // authenticated: true,
        // setAuthenticated: jest.fn(() => {}),
        // setUser: jest.fn(() => {}),
        // signOut: jest.fn(() => Promise.resolve()),
    };
    const wrapper = mount(
        <AuthContext.Provider value={value}>
            <MemoryRouter>
                <AddPost />
            </MemoryRouter>
        </AuthContext.Provider>,
    );
    const mockApi = jest.spyOn(api, "post");
    const button = wrapper.find(Button).at(0);
    afterAll(() => {
        wrapper.unmount();
    });
    it("renders without crash", () => {
        const tree = shallow(<AddPost />);
        expect(toJson(tree)).toMatchSnapshot();
    });
    it("calls api when post is sent", () => {
        expect(button.text()).toEqual("Share");
        button.simulate("click");
        expect(mockApi).toBeCalled();
    });
});
