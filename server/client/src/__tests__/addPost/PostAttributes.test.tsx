import { Button, Select, TextField } from "@material-ui/core";
import toJson from "enzyme-to-json";
import { mount } from "enzyme";
import React from "react";
import PostAttributes, { PostAttributesProps } from "../../components/AddPost/PostAttributes";
import { MemoryRouter } from "react-router-dom";

const mockGoBack = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
        goBack: mockGoBack,
    }),
}));

describe("Post attributes component test", () => {
    const props: PostAttributesProps = {
        textContent: "foo",
        setTextContent: jest.fn((foo) => foo),
        setFontFamily: jest.fn(() => {}),
        color: "string",
        setColor: jest.fn(() => {}),
        backgroundColor: "string",
        setBackgroundColor: jest.fn(() => {}),
        fontWeight: 400,
        setFontWeight: jest.fn(() => {}),
        fontSize: 40,
        setFontSize: jest.fn(() => {}),
        textAlign: "left",
        setTextAlign: jest.fn(() => {}),
        addPost: jest.fn(() => Promise.resolve()),
        fontWeightValues: [400, 700, 900],
        setFontWeightValues: jest.fn(),
    };
    const wrapper = mount(
        <MemoryRouter>
            <PostAttributes {...props} />
        </MemoryRouter>,
    );
    it("has two button", () => {
        expect(wrapper.find(Button)).toHaveLength(2);
        expect(wrapper.find(Button).at(0).text()).toEqual("Share");
        expect(wrapper.find(Button).at(1).text()).toEqual("Cancel");
    });
    it("has a working text field", () => {
        expect(wrapper.find(TextField)).toHaveLength(1);
        const textField = wrapper.find(TextField).at(0);
        expect(textField.props().value).toEqual("foo");
    });
    it("has four select fields", () => {
        expect(wrapper.find(Select)).toHaveLength(4);
    });
    it("goes to previous page when cancelled", () => {
        wrapper.find(Button).at(1).simulate("click");
        expect(mockGoBack).toHaveBeenCalled();
    });
});
