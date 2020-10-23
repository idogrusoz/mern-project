import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import AvatarMenu, { AvatarMenuProps } from "../../components/NavBar/AvatarMenu";

describe("AvatarMenu test", () => {
    const props: AvatarMenuProps = {
        anchorEl: null,
        goToAdd: () => {},
        goToProfile: () => {},
        handleClick: () => {},
        handleClose: () => {},
        handleSignOut: () => {},
    };
    const wrapper = shallow(<AvatarMenu {...props} />);
    it("renders without crash", () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
