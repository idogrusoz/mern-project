import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import PostDisplay from "../components/PostDisplay";
import { IPostInterface } from "../../../interfaces/post.interfaces";

describe("PostDisplay test", () => {
    const props: { post: IPostInterface } = {
        post: {
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
    };

    const wrapper = shallow(<PostDisplay {...props} />);
    it("renders without crash", () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
