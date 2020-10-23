import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import PostsContainer from "../components/Profile/PostsContainer";
import { IPostInterface } from "../../../interfaces/post.interfaces";

describe("PostsContainer test", () => {
    const posts: IPostInterface[] = [
        {
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
    ];
    const wrapper = shallow(<PostsContainer posts={posts} />);
    it("renders without crash", () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
