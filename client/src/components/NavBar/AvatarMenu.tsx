import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import React, { FunctionComponent, useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";

export type AvatarMenuProps = {
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    anchorEl: HTMLElement | null;
    handleClose: () => void;
    goToProfile: () => void;
    goToAdd: () => void;
    handleSignOut: () => void;
};

const AvatarMenu: FunctionComponent<AvatarMenuProps> = ({
    handleClick,
    anchorEl,
    handleClose,
    goToAdd,
    goToProfile,
    handleSignOut,
}) => {
    const { user } = useContext(AuthContext);
    return (
        <>
            <IconButton color="secondary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <Avatar src={user ? user.image : undefined} />
            </IconButton>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={goToProfile}>Profile</MenuItem>
                <MenuItem onClick={goToAdd}>AddPost</MenuItem>
                <MenuItem onClick={handleSignOut}>SignOut</MenuItem>
            </Menu>
        </>
    );
};

export default AvatarMenu;
