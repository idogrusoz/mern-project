import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import SingleSearchResult, { SingleSearchResultProps } from "../../components/NavBar/SingleSearchResult";

describe("SingleSearchResult test", () => {
    const props: SingleSearchResultProps = {
        user: {
            _id: "id",
            displayName: "displayName",
            image: "",
            userName: "userName",
            followers: [],
            following: [],
        },
        pickUser: () => {},
    };
    const wrapper = shallow(<SingleSearchResult {...props} />);
    it("renders without crash", () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
