import { Container, Typography } from "@material-ui/core";
import React, { useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { SignInUser, UserInterface } from "../../../../interfaces/user.interfaces";
import api from "../../api";
import { AuthContext } from "./AuthContext";
import Register from "./Register";
import SignIn from "./SignIn";

const Landing = () => {
    const [showSignin, setShowSignin] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const { setAuthenticated, setUser } = useContext(AuthContext);
    const [userNameInput, setUserNameInput] = useState<string>("");
    const history = useHistory();

    const register = useCallback(async (user: UserInterface) => {
        try {
            const response = await api.post("auth/register", user);
            setShowSignin(response.status === 200);
        } catch (error) {
            setError(true);
            setErrorMessage(error.message);
        }
    }, []);

    const signin = useCallback(
        async (user: SignInUser) => {
            try {
                console.log("object", user);
                const response = await api.post("auth/signin", user);
                setAuthenticated(response.data.isAuthenticated);
                setUser(response.data.user);
                history.push("/");
            } catch (error) {
                setError(true);
                setErrorMessage(error.message);
            }
        },
        [setAuthenticated, setUser, history],
    );

    return (
        <Container maxWidth="sm">
            {error && <Typography color="secondary">{errorMessage}</Typography>}
            {showSignin ? (
                <SignIn signin={signin} setShowSignin={setShowSignin} />
            ) : (
                <Register
                    register={register}
                    setShowSignin={setShowSignin}
                    userNameInput={userNameInput}
                    setUserNameInput={setUserNameInput}
                />
            )}
        </Container>
    );
};

export default Landing;
