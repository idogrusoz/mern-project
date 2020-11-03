import React from "react";
import toJson from "enzyme-to-json";
import { HTMLAttributes, mount, ReactWrapper } from "enzyme";
import NavBar from "../../components/NavBar/NavBar";
import api from "../../api";
import { AuthContext } from "../../components/Auth/AuthContext";
import { authWithUser, profileOwner, profileWithData } from "../../resources/testResources";
import { ProfileContext } from "../../components/Profile/ProfileContext";
import { ExtendButtonBaseTypeMap, IconButton, IconButtonTypeMap, InputBase, Menu, MenuItem } from "@material-ui/core";
import { act } from "@testing-library/react";
import SingleSearchResult from "../../components/NavBar/SingleSearchResult";
import AvatarMenu from "../../components/NavBar/AvatarMenu";
import { DefaultComponentProps } from "@material-ui/core/OverridableComponent";
jest.mock("../../api.ts");

const mockGet = jest.spyOn(api, "get");
const mockPush = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
        push: mockPush,
    }),
}));
const mockListener = jest.spyOn(window, "addEventListener");

describe("NavBar test", () => {
    let wrapper: ReactWrapper<any>;
    let input: ReactWrapper<HTMLAttributes, any, React.Component<{}, {}, any>>;
    let avatar: ReactWrapper<
        DefaultComponentProps<ExtendButtonBaseTypeMap<IconButtonTypeMap<{}, "button">>>,
        never,
        React.Component<any, any>
    >;
    beforeEach(() => {
        wrapper = mount(
            <AuthContext.Provider value={authWithUser}>
                <ProfileContext.Provider value={profileWithData}>
                    <NavBar />
                </ProfileContext.Provider>
            </AuthContext.Provider>,
        );
        input = wrapper.find(InputBase).at(0).find("input");
        avatar = wrapper.find(AvatarMenu).at(0).find(IconButton).at(0);
    });
    it("renders without crash", () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it("triggers search when typed", async () => {
        await act(async () => {
            input.simulate("change");
        });
        expect(mockGet).toBeCalled();
    });
    it("adds event listener", () => {
        expect(mockListener).toBeCalled();
    });
    it("displays search results", async () => {
        mockGet.mockReturnValue(Promise.resolve({ data: { data: [profileOwner] } }));
        await act(async () => {
            input.simulate("change");
        });
        await new Promise((resolve) => setTimeout(resolve, 0));
        wrapper.update();
        await act(async () => {
            wrapper.find(SingleSearchResult).at(0).simulate("click");
        });

        wrapper.update();
        expect(profileWithData.setProfileOwner).toBeCalledWith(profileOwner);
        expect(wrapper.find(SingleSearchResult).length).toBe(0);
        expect(mockPush).toBeCalledWith(`/profile/${profileOwner._id}`);
    });
    it("redirects to user profile", async () => {
        await act(async () => {
            avatar.simulate("click");
        });
        wrapper.update();
        expect(wrapper.find(Menu).props().open).toBeTruthy();

        await act(async () => {
            wrapper.find(MenuItem).at(0).simulate("click");
        });
        wrapper.update();
        expect(mockPush).toBeCalledWith("/");
        expect(wrapper.find(Menu).props().open).not.toBeTruthy();
    });
    it("redirects to add post", async () => {
        await act(async () => {
            avatar.simulate("click");
        });
        wrapper.update();
        await act(async () => {
            wrapper.find(MenuItem).at(1).simulate("click");
        });
        wrapper.update();
        expect(mockPush).toBeCalledWith("/add-post");
    });
    it("calls sign out", async () => {
        await act(async () => {
            avatar.simulate("click");
        });
        wrapper.update();
        await act(async () => {
            wrapper.find(MenuItem).at(2).simulate("click");
        });
        wrapper.update();
        expect(authWithUser.signOut).toBeCalled();
    });
});
