import { Button, Grid, TextField } from "@material-ui/core";
import React, { Dispatch, FunctionComponent, SetStateAction } from "react";

export type RegisterProps = {
    firstName: string;
    setFirstName: Dispatch<SetStateAction<string>>;
    lastName: string;
    setLastName: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    password2: string;
    setPassword2: Dispatch<SetStateAction<string>>;
    setShowSignin: Dispatch<SetStateAction<boolean>>;
    register: () => void;
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
};
const Register: FunctionComponent<RegisterProps> = ({
    email,
    firstName,
    lastName,
    password,
    password2,
    register,
    setEmail,
    setFirstName,
    setLastName,
    setPassword,
    setPassword2,
    setShowSignin,
}) => {
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
                    <Button type="submit" color="primary" variant="contained" onClick={register}>
                        Register
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        id="signinButton"
                        type="submit"
                        color="primary"
                        variant="contained"
                        onClick={() => setShowSignin(true)}
                    >
                        SignIn
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default Register;
