import { Avatar, Button, Typography } from "@material-ui/core";
import { mount } from "enzyme";
import React from "react";
import { AuthContext } from "../../components/Auth/AuthContext";
import { ProfileContext } from "../../components/Profile/ProfileContext";
import ProfileOwner from "../../components/Profile/ProfileOwner";
import { authWithUser, profileOwner, profileWithData } from "../../resources/testResources";
jest.mock("../../api.ts");
import api from "../../api";
import { act } from "@testing-library/react";

const mockPut = jest.spyOn(api, "put");

describe("Profile Owner", () => {
    const mountComponent = (userFollows?: boolean) => {
        let profileValue = profileWithData;
        if (userFollows) {
            profileValue.profileOwner!.followers = ["userId"];
        }
        return mount(
            <AuthContext.Provider value={authWithUser}>
                <ProfileContext.Provider value={profileValue}>
                    <ProfileOwner />
                </ProfileContext.Provider>
            </AuthContext.Provider>,
        );
    };
    it("renders user data", () => {
        const wrapper = mountComponent();
        expect(wrapper.find(Avatar).at(0).props().src).toBe("image");
        expect(wrapper.find(Typography).at(0).text()).toBe(profileOwner.displayName);
        expect(wrapper.find(Typography).at(1).text()).toBe(profileOwner.userName);
    });
    it("renders follow button", async () => {
        mockPut.mockImplementation(() => Promise.resolve({ data: { data: profileOwner } }));
        const wrapper = mountComponent();
        const button = wrapper.find(Button).at(0);
        expect(button.text()).toBe("FOLLOW");
        button.simulate("click");
        await new Promise((resolve) => setTimeout(resolve, 0));
        expect(mockPut).toBeCalledWith(`users/${profileOwner._id}/follow`);
        expect(profileWithData.setProfileOwner).toBeCalled();
    });
    it("renders unfollow button", async () => {
        mockPut.mockImplementation(() => Promise.resolve({ data: { data: profileOwner } }));
        const wrapper = mountComponent(true);
        const button = wrapper.find(Button).at(0);
        expect(button.text()).toBe("UNFOLLOW");
        button.simulate("click");
        await new Promise((resolve) => setTimeout(resolve, 0));
        expect(mockPut).toBeCalledWith(`users/${profileOwner._id}/unfollow`);
        expect(profileWithData.setProfileOwner).toBeCalled();
    });
});
