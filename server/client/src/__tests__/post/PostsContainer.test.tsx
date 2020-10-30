import React from "react";
import toJson from "enzyme-to-json";
import { mount, render, shallow } from "enzyme";
import PostsContainer, { PostContainerProps } from "../../components/Post/PostsContainer";
import { MemoryRouter } from "react-router-dom";
import { AuthContext, AuthContextObject, defaultContextValue } from "../../components/Auth/AuthContext";
import EmptyProfile from "../../components/Profile/EmptyProfile";
const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));
describe("PostsContainer test", () => {
    const props: PostContainerProps = {
        activeTab: "feed",
        fetchFeed: jest.fn(),
        fetchLikedPosts: jest.fn(),
        fetchUserPosts: jest.fn(),
        isLoading: false,
        posts: [
            {
                _id: "postId",
                likes: [],
                textContent: "",
                author: {
                    user_id: "userId",
                    image: "",
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
        ],
    };

    const authValue: AuthContextObject = {
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

    const mountComponent = (props: PostContainerProps) => {
        return mount(
            <AuthContext.Provider value={authValue}>
                <MemoryRouter>
                    <PostsContainer {...props} />
                </MemoryRouter>
            </AuthContext.Provider>,
        );
    };

    it("renders without crash", () => {
        const wrapper = shallow(<PostsContainer {...props} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it("calls feed function to fetch posts", () => {
        const tabs: Array<"feed" | "posts" | "likes"> = ["feed", "posts", "likes"];
        for (let tab of tabs) {
            const newProps: PostContainerProps = { ...props, activeTab: tab };
            mountComponent(newProps);
            if (tab === "feed") {
                expect(props.fetchFeed).toHaveBeenCalled();
            }
            if (tab === "posts") {
                expect(props.fetchUserPosts).toHaveBeenCalled();
            }
            if (tab === "likes") {
                expect(props.fetchLikedPosts).toHaveBeenCalled();
            }
        }
    });
    it("displays empty profile component when there are no posts", () => {
        const propsWithNoPosts: PostContainerProps = { ...props, posts: [] };
        const wrapper = mountComponent(propsWithNoPosts);
        expect(wrapper.find(EmptyProfile).length).toBe(1);
    });
});
