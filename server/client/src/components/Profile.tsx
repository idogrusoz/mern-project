import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { AuthContext } from "./auth/AuthContext";

const Profile = () => {
    const { user, signOut } = useContext(AuthContext);
    return (
        <div>
            <h1>{user!.displayName}</h1>
            <h3>{user!._id}</h3>
            <Button onClick={signOut}>Sign Out</Button>
        </div>
    );
};

export default Profile;
