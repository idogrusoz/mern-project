import { Button, Typography } from "@material-ui/core";
import { mount } from "enzyme";
import React from "react";
import EmptyProfile from "../../components/Profile/EmptyProfile";
import {
    defaultProfileContextValue,
    ProfileContext,
    ProfileContextObject,
} from "../../components/Profile/ProfileContext";
import { profileWithData } from "../../resources/testResources";
const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));
describe("Emprty Profile", () => {
    let profileValue: ProfileContextObject = defaultProfileContextValue;

    const renderComponent = (activeTab: "feed" | "posts" | "likes" = "feed", withProfileOwner?: boolean) => {
        if (withProfileOwner) {
            profileValue = profileWithData;
        }
        return mount(
            <ProfileContext.Provider value={profileValue}>
                <EmptyProfile activeTab={activeTab} />
            </ProfileContext.Provider>,
        );
    };
    it("renders with add post button", () => {
        const wrapper = renderComponent("posts");
        const button = wrapper.find(Button).at(0);
        expect(button.text()).toBe("Add Post");
        button.simulate("click");
        expect(mockHistoryPush).toBeCalledWith("/add-post");
    });
    it("renders empty feed warning", () => {
        const wrapper = renderComponent();
        expect(wrapper.find(Typography).at(0).text()).toBe(
            "You don't follow any users. Use search to find others and follow them so that you can see their posts on ypur feed.",
        );
    });
    it("renders empty posts warning for user", () => {
        const wrapper = renderComponent("posts");
        expect(wrapper.find(Typography).at(0).text()).toBe("You don't have any posts yet.");
    });
    it("renders empty likes warning for user", () => {
        const wrapper = renderComponent("likes");
        expect(wrapper.find(Typography).at(0).text()).toBe("You haven't liked any posts yet.");
    });
    it("renders empty posts warning for other users", () => {
        const wrapper = renderComponent("posts", true);
        expect(wrapper.find(Typography).at(0).text()).toBe("otherDisplayName doesn't have any posts yet.");
    });
    it("renders empty likes warning for other users", () => {
        const wrapper = renderComponent("likes", true);
        expect(wrapper.find(Typography).at(0).text()).toBe("otherDisplayName hasn't liked any posts yet.");
    });
});
