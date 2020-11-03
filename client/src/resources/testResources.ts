import { SearchedUser } from "./../../../interfaces/user.interfaces";
import { ProfileContextObject } from "./../components/Profile/ProfileContext";
import { AuthContextObject } from "../components/Auth/AuthContext";
import { ResponseUser } from "../../../interfaces/user.interfaces";
import { act } from "@testing-library/react";

export const mockUser: ResponseUser = {
    _id: "userId",
    firstName: "firstName",
    lastName: "lastName",
    displayName: "displayName",
    userName: "userName",
    email: "email",
};

export const authWithUser: AuthContextObject = {
    isAuthenticated: jest.fn(),
    authenticated: true,
    setAuthenticated: jest.fn(),
    user: mockUser,
    setUser: jest.fn(),
    signOut: jest.fn(),
};

export const authWithoutUser: AuthContextObject = {
    ...authWithUser,
    authenticated: false,
    user: null,
};

export const profileOwner: SearchedUser = {
    _id: "profileOwner1",
    userName: "otherUser",
    image: "image",
    displayName: "otherDisplayName",
    followers: [],
    following: [],
};

export const profileWithData: ProfileContextObject = {
    profileOwner,
    setProfileOwner: jest.fn(),
};

export const waitForComponentToPaint = async (wrapper: any) => {
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
        wrapper.update();
    });
};
