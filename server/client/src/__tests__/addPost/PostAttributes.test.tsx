import { Button, Select, TextField } from "@material-ui/core";
import toJson from "enzyme-to-json";
import { mount } from "enzyme";
import React from "react";
import PostAttributes, { PostAttributesProps } from "../../components/AddPost/PostAttributes";
describe("Post attributes component test", () => {
    const props: PostAttributesProps = {
        textContent: "foo",
        setTextContent: jest.fn((foo) => foo),
        fontFamily: "string",
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
    };
    const wrapper = mount(<PostAttributes {...props} />);
    it("renders without crash", () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
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
});
