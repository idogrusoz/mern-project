import React, { useContext } from "react";
import { AuthContext } from "./auth/AuthContext";

const Profile = () => {
    const { user } = useContext(AuthContext);
    return (
        <div>
            <h1>{user!.displayName}</h1>
            <h3>{user!._id}</h3>
        </div>
    );
};

export default Profile;
