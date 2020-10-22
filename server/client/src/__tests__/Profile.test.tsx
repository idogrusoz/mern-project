import React from "react";
import toJson from "enzyme-to-json";
import { mount } from "enzyme";
import Profile from "../components/Profile";
import { MemoryRouter } from "react-router-dom";
import { AuthContext, AuthContextObject, defaultContextValue } from "../components/auth/AuthContext";

describe("Profile test", () => {
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
    };
    const wrapper = mount(
        <AuthContext.Provider value={value}>
            <MemoryRouter>
                <Profile />
            </MemoryRouter>
        </AuthContext.Provider>,
    );
    it("renders without crash", () => {
        expect(toJson(wrapper.find(Profile))).toMatchSnapshot();
    });
});
