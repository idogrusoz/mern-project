import { Button, Grid, TextField } from "@material-ui/core";
import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

const Register = () => {
    const {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        password,
        setPassword,
        password2,
        setPassword2,
        setShowSignin,
        register,
        email,
        setEmail,
    } = useContext(AuthContext);
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
                        label="First Name"
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="standard-basic"
                        label="Last Name"
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="standard-basic"
                        label="Email"
                        type="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="standard-basic"
                        label="Password"
                        type="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="standard-basic"
                        label="Password"
                        type="Password"
                        onChange={(e) => setPassword2(e.target.value)}
                        value={password2}
                    />
                </Grid>
                <Grid item>
                    <Button type="submit" color="primary" variant="contained" onClick={() => register()}>
                        Register
                    </Button>
                </Grid>
                <Grid item>
                    <Button type="submit" color="primary" variant="contained" onClick={() => setShowSignin(true)}>
                        SignIn
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default Register;
