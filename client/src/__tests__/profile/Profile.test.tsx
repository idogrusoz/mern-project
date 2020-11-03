import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../components/Auth/AuthContext";
import Profile from "../../components/Profile/Profile";
import api from "../../api";
import PostsContainer from "../../components/Post/PostsContainer";
import { act } from "@testing-library/react";
import { ProfileContext, ProfileContextObject } from "../../components/Profile/ProfileContext";
import { authWithUser, profileOwner, profileWithData, waitForComponentToPaint } from "../../resources/testResources";
jest.mock("../../api.ts");

const mockLocation = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        pathname: mockLocation(),
    }),
}));

const post = {
    _id: "postId1",
    likes: [],
    textContent: "",
    author: {
        user_id: "userId",
        image: "userImage",
        userName: "userName",
    },
    style: {
        fontFamily: "Roboto",
        color: "#ffffff",
        backgroundColor: "#ffffff",
        fontWeight: 400,
        fontSize: 40,
        textAlign: "left" as "left" | "right" | "justify" | "center",
    },
};

const mockGet = jest.spyOn(api, "get");

describe("Profile test", () => {
    let profileValue: ProfileContextObject = {
        profileOwner: null,
        setProfileOwner: jest.fn(),
    };

    const mountComponent = (useProfileOwner?: boolean) => {
        if (useProfileOwner) {
            profileValue = profileWithData;
        }
        return mount(
            <AuthContext.Provider value={authWithUser}>
                <ProfileContext.Provider value={profileValue}>
                    <MemoryRouter>
                        <Profile />
                    </MemoryRouter>
                </ProfileContext.Provider>
            </AuthContext.Provider>,
        );
    };
    it("renders user feed", async () => {
        mockLocation.mockReturnValue("/profile/userId");
        mockGet.mockReturnValue(Promise.resolve({ data: { data: [post] } }));

        const wrapper = mountComponent();
        await waitForComponentToPaint(wrapper);
        expect(wrapper.find(PostsContainer).props().posts).toEqual([post]);
    });
    it("renders user posts", async () => {
        mockLocation.mockReturnValue("/profile/userId");

        mockGet.mockReturnValue(Promise.resolve({ data: { data: [{ ...post, postId: "postId2" }] } }));

        const wrapper = mountComponent();
        await waitForComponentToPaint(wrapper);
        await act(async () => {
            wrapper.find("#postsButton").at(0).simulate("click");
        });
        expect(mockGet).toBeCalledWith("posts/user/userId");
        await wrapper.update();
        expect(wrapper.find(PostsContainer).props().activeTab).toBe("posts");
        expect(wrapper.find(PostsContainer).props().posts).toStrictEqual([{ ...post, postId: "postId2" }]);
    });
    it("renders liked posts", async () => {
        mockLocation.mockReturnValue("/profile/userId");

        mockGet.mockReturnValue(Promise.resolve({ data: { data: [{ ...post, postId: "postId3" }] } }));
        const wrapper = mountComponent();
        await waitForComponentToPaint(wrapper);
        await act(async () => {
            wrapper.find("#likesButton").at(0).simulate("click");
        });
        wrapper.update();
        expect(wrapper.find(PostsContainer).props().activeTab).toBe("likes");
        expect(wrapper.find(PostsContainer).props().posts).toStrictEqual([{ ...post, postId: "postId3" }]);
    });
    it("fetches right profile when path changes", async () => {
        mockGet.mockImplementation((url: string) => {
            if (url === "/users/profileOwner1") {
                return Promise.resolve({ data: { data: profileOwner } });
            }
            return Promise.resolve({ data: { data: [{ ...post, postId: "postId2" }] } });
        });
        mockLocation.mockReturnValue("/profile/profileOwner1");
        const wrapper = mountComponent();
        await waitForComponentToPaint(wrapper);
        expect(mockGet).toBeCalledWith("/users/profileOwner1");
    });
    it("doesn't display feed on other user's profile", async () => {
        mockGet.mockImplementation((url: string) => {
            if (url === "/users/profileOwner1") {
                return Promise.resolve({ data: { data: profileOwner } });
            }
            return Promise.resolve({ data: { data: [{ ...post, postId: "postId2" }] } });
        });
        mockLocation.mockReturnValue("/profile/profileOwner1");
        const wrapper = mountComponent(true);
        await waitForComponentToPaint(wrapper);
        expect(wrapper.find(PostsContainer).props().activeTab).toBe("posts");
    });
});
