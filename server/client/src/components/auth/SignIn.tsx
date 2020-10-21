import { Button, Grid, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { Dispatch, FunctionComponent, SetStateAction } from "react";
import { SignInUser } from "../../../../interfaces/user.interfaces";

export type SignInProps = {
    setShowSignin: Dispatch<SetStateAction<boolean>>;
    signin: (user: SignInUser) => void;
};

const SignIn: FunctionComponent<SignInProps> = ({ setShowSignin, signin }) => {
    const formik = useFormik({
        initialValues: { email: "", password: "" },
        onSubmit: () => {
            signin(formik.values);
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required").trim(),
            password: Yup.string().trim().required(),
        }),
    });
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
            }}
        >
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
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={formik.touched.email && formik.errors.email ? true : false}
                        helperText={formik.touched.email ? formik.errors.email : undefined}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="standard-basic"
                        label="Password"
                        type="Password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={formik.touched.password && formik.errors.email ? true : false}
                        helperText={formik.touched.password ? formik.errors.password : undefined}
                    />
                </Grid>
                <Grid item>
                    <Button type="submit" variant="contained" color="primary" size="large">
                        Sign In
                    </Button>
                </Grid>
                <Grid item>
                    <Button
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
        </form>
    );
};

export default SignIn;
