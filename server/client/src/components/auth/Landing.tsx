import { Container, Typography } from "@material-ui/core";
import React, { useCallback, useContext, useState } from "react";
import { SignInUser, UserInterface } from "../../../../interfaces/user.interfaces";
import api from "../../api";
import { AuthContext } from "./AuthContext";
import Register from "./Register";
import SignIn from "./SignIn";

const Landing = () => {
    const [showSignin, setShowSignin] = useState<boolean>(true);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const { setAuthenticated, setUser } = useContext(AuthContext);

    const buildUser = useCallback((): UserInterface => {
        return {
            firstName,
            lastName,
            displayName: firstName + " " + lastName,
            email,
            password,
        };
    }, [firstName, lastName, email, password]);

    const register = useCallback(async () => {
        const user = buildUser();
        try {
            const response = await api.post("auth/register", user);
            setShowSignin(response.status === 200);
        } catch (error) {
            setError(true);
            setErrorMessage(error.message);
        }
    }, [buildUser]);

    const signin = useCallback(async () => {
        const body: SignInUser = { email, password };
        try {
            const response = await api.post("auth/signin", body);
            setAuthenticated(response.data.isAthenticated);
            setUser(response.data.user);
        } catch (error) {
            setError(true);
            setErrorMessage(error.message);
        }
    }, [email, password]);

    return (
        <Container maxWidth="sm">
            {error && <Typography color="secondary">{errorMessage}</Typography>}
            {showSignin ? (
                <SignIn
                    signin={signin}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    setShowSignin={setShowSignin}
                />
            ) : (
                <Register
                    register={register}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    password2={password2}
                    setPassword2={setPassword2}
                    firstName={firstName}
                    setFirstName={setFirstName}
                    lastName={lastName}
                    setLastName={setLastName}
                    setShowSignin={setShowSignin}
                />
            )}
        </Container>
    );
};

export default Landing;
