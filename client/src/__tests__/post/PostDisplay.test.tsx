import React from "react";
import { mount } from "enzyme";
import PostDisplay, { PostDisplayProps } from "../../components/Post/PostDisplay";
import { AuthContext } from "../../components/Auth/AuthContext";
import { Avatar, CardHeader } from "@material-ui/core";
import { MemoryRouter } from "react-router-dom";
import { defaultProfileContextValue, ProfileContext } from "../../components/Profile/ProfileContext";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import api from "../../api";
import { act } from "@testing-library/react";
import { authWithUser } from "../../resources/testResources";
jest.mock("../../api.ts");

const mockPut = jest.spyOn(api, "put");

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

describe("PostDisplay test", () => {
    const props: PostDisplayProps = {
        post: {
            _id: "postId",
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
        },
        fetch: jest.fn(),
    };

    const wrapper = mount(
        <AuthContext.Provider value={authWithUser}>
            <ProfileContext.Provider value={defaultProfileContextValue}>
                <MemoryRouter>
                    <PostDisplay {...props} />
                </MemoryRouter>
            </ProfileContext.Provider>
        </AuthContext.Provider>,
    );
    const icon = wrapper.find(FavoriteBorderIcon);
    it("contains author data", () => {
        expect(wrapper.find(Avatar).props().src).toBe(props.post.author.image);
        expect(wrapper.find(CardHeader).props().title).toBe(props.post.author.userName);
    });
    it("redirects to post author's profile", () => {
        wrapper.find(CardHeader).simulate("click");
        expect(mockHistoryPush).toBeCalledWith(props.post.author.user_id);
    });
    it("handles click on like icon", async () => {
        const mockResponse = {
            data: {
                error: false,
                data: {
                    ...props.post,
                    likes: ["userId"],
                },
            },
        };
        mockPut.mockReturnValue(Promise.resolve(mockResponse));
        await act(async () => {
            icon.simulate("click");
        });
        expect(mockPut).toBeCalled();
        expect(props.fetch).toBeCalled();
    });
});
