import { Container } from "@material-ui/core";
import React, { useContext } from "react";
import { AuthContext } from "./auth/AuthContext";
import Register from "./auth/Register";
import SignIn from "./auth/SignIn";

const Landing = () => {
    const { showSignin } = useContext(AuthContext);
    return <Container maxWidth="sm">{showSignin ? <SignIn /> : <Register />}</Container>;
};

export default Landing;
