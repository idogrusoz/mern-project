import { Button } from "@material-ui/core";
import { act } from "@testing-library/react";
import { shallow } from "enzyme";
import React from "react";
import PostTabs from "../../components/Profile/PostTabs";

describe("PostTabs test", () => {
    const mockProp = jest.fn();
    const props = (activeTab: "feed" | "posts" | "likes") => {
        return {
            activeTab,
            setActiveTab: mockProp,
        };
    };
    const getWrapper = (activeTab: "feed" | "posts" | "likes") => {
        return shallow(<PostTabs {...props(activeTab)} />);
    };
    it("changes tabs on click", () => {
        const wrapper = getWrapper("posts");
        act(() => {
            wrapper.find(Button).at(0).simulate("click");
        });
        expect(props("posts").setActiveTab).toBeCalledWith("feed");
    });
    it("changes tabs on click", () => {
        const wrapper = getWrapper("feed");
        act(() => {
            wrapper.find(Button).at(1).simulate("click");
        });
        expect(props("feed").setActiveTab).toBeCalledWith("posts");
    });
    it("changes tabs on click", () => {
        const wrapper = getWrapper("feed");
        act(() => {
            wrapper.find(Button).at(2).simulate("click");
        });
        expect(props("feed").setActiveTab).toBeCalledWith("likes");
    });
});
