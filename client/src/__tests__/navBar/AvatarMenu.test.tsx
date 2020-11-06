import React from "react";
import toJson from "enzyme-to-json";
import { mount, shallow } from "enzyme";
import AvatarMenu, { AvatarMenuProps } from "../../components/NavBar/AvatarMenu";
import { AuthContext } from "../../components/Auth/AuthContext";
import { authWithUser } from "../../resources/testResources";
import { Avatar } from "@material-ui/core";

describe("AvatarMenu test", () => {
    const props: AvatarMenuProps = {
        anchorEl: null,
        goToAdd: () => {},
        goToProfile: () => {},
        handleClick: () => {},
        handleClose: () => {},
        handleSignOut: () => {},
    };
    it("renders without crash", () => {
        const wrapper = shallow(<AvatarMenu {...props} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it("renders user image", () => {
        const wrapper = mount(
            <AuthContext.Provider value={authWithUser}>
                <AvatarMenu {...props} />
            </AuthContext.Provider>,
        );
        expect(wrapper.find(Avatar).props().src).toBe(authWithUser.user!.image);
    });
});
