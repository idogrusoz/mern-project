jest.mock("../../api.ts");
import React from "react";
import toJson from "enzyme-to-json";
import { mount, shallow } from "enzyme";
import api from "../../api";
import AddPost from "../../components/AddPost/AddPost";
import { Button } from "@material-ui/core";
import { AuthContext } from "../../components/Auth/AuthContext";
import { MemoryRouter } from "react-router-dom";
import { authWithUser } from "../../resources/testResources";

describe("AddPost test", () => {
    const wrapper = mount(
        <AuthContext.Provider value={authWithUser}>
            <MemoryRouter>
                <AddPost />
            </MemoryRouter>
        </AuthContext.Provider>,
    );
    const mockApi = jest.spyOn(api, "post");
    const button = wrapper.find(Button).at(0);
    afterAll(() => {
        wrapper.unmount();
    });
    it("renders without crash", () => {
        const tree = shallow(<AddPost />);
        expect(toJson(tree)).toMatchSnapshot();
    });
    it("calls api when post is sent", () => {
        expect(button.text()).toEqual("Share");
        button.simulate("click");
        expect(mockApi).toBeCalled();
    });
});
