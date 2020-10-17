import { Button, Grid, TextField } from "@material-ui/core";
import React, { Dispatch, FunctionComponent, SetStateAction } from "react";

export type SignInProps = {
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    setShowSignin: Dispatch<SetStateAction<boolean>>;
    signin: () => void;
};

const SignIn: FunctionComponent<SignInProps> = ({ email, setEmail, password, setPassword, setShowSignin, signin }) => {
    return (
        <>
            <Grid
                container
                justify="center"
                spacing={2}
                alignItems="center"
                direction="column"
                style={{ overflowX: "auto", minHeight: " 100vh" }}
            >
                <Grid item>
                    <TextField
                        id="standard-basic"
                        label="Email"
                        type="Email"
                        onChange={(e: { target: { value: any } }) => setEmail(e.target.value)}
                        value={email}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="standard-basic"
                        label="Password"
                        type="Password"
                        onChange={(e: { target: { value: any } }) => setPassword(e.target.value)}
                        value={password}
                    />
                </Grid>
                <Grid item>
                    <Button type="submit" variant="contained" color="primary" size="large" onClick={signin}>
                        Sign In
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => {
                            setShowSignin(false);
                        }}
                    >
                        Register
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default SignIn;
