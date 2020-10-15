import { Button, Grid, TextField } from "@material-ui/core";
import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

const SignIn = () => {
    const { email, setEmail, password, setPassword, setShowSignin, signin } = useContext(AuthContext);
    return (
        <>
            <Grid
                container
                justify="center"
                spacing={2}
                alignItems="center"
                direction="column"
                style={{ height: "100vh" }}
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
                    <Button type="submit" variant="contained" color="primary" size="large" onClick={() => signin()}>
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
                            console.log(1);
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
