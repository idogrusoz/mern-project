import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import api from "../../api";
import { UserInterface } from "../../../../interfaces/user.interfaces";

export type RegisterProps = {
    register: (user: UserInterface) => void;
    setShowSignin: Dispatch<SetStateAction<boolean>>;
};

const useStyles = makeStyles({
    container: {
        overflowX: "auto",
        minHeight: " 100vh",
    },
});

const Register: FunctionComponent<RegisterProps> = ({ register, setShowSignin }) => {
    const [userNameInput, setUserNameInput] = useState<string>("");
    const classes = useStyles();
    const formik = useFormik({
        initialValues: { firstName: "", lastName: "", userName: "", email: "", password: "", password2: "" },
        onSubmit: () => {
            const user: UserInterface = {
                ...formik.values,
                displayName: formik.values.firstName + " " + formik.values.lastName,
            };
            register(user);
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .min(2, "Must be at least two chaeacters")
                .max(30, "Must be maximum 30 characters or less")
                .required("Required")
                .trim(),
            lastName: Yup.string()
                .min(2, "Must be at least two chaeacters")
                .max(30, "Must be maximum 30 characters or less")
                .required("Required")
                .trim(),
            userName: Yup.string()
                .min(3, "Must be at least three chaeacters")
                .max(30, "Must be maximum 30 characters or less")
                .required("Required")
                .test("check user name", "This username is not available", async (value: string | null | undefined) => {
                    if (value && value !== userNameInput) {
                        setUserNameInput(value);
                        return api
                            .post("users/username", { value })
                            .then((data) => data.data)
                            .catch((error) => false);
                    }
                    return value;
                })
                .trim(),
            password: Yup.string()
                .trim()
                // .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
                .required(),
            password2: Yup.string()
                .trim()
                .oneOf([Yup.ref("password"), ""], "Passwords must match")
                .required(),
            email: Yup.string().email("Invalid email address").required("Required").trim(),
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
                className={classes.container}
            >
                <Grid item>
                    <TextField
                        id="standard-basic"
                        label="First Name"
                        type="text"
                        name="firstName"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                        error={formik.touched.firstName && formik.errors.firstName ? true : false}
                        helperText={formik.touched.firstName ? formik.errors.firstName : undefined}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="standard-basic"
                        label="Last Name"
                        type="text"
                        name="lastName"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        error={formik.touched.lastName && formik.errors.lastName ? true : false}
                        helperText={formik.touched.lastName ? formik.errors.lastName : undefined}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="standard-basic"
                        label="User Name"
                        type="text"
                        name="userName"
                        onChange={formik.handleChange}
                        value={formik.values.userName}
                        error={formik.touched.userName && formik.errors.userName ? true : false}
                        helperText={formik.touched.userName ? formik.errors.userName : undefined}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="standard-basic"
                        label="Email"
                        type="text"
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
                        error={formik.touched.password && formik.errors.password ? true : false}
                        helperText={
                            formik.touched.password
                                ? formik.errors.password
                                    ? "Invalid password"
                                    : undefined
                                : undefined
                        }
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="standard-basic"
                        label="Confirm Password"
                        type="Password"
                        name="password2"
                        onChange={formik.handleChange}
                        value={formik.values.password2}
                        error={formik.touched.password2 && formik.errors.password2 ? true : false}
                        helperText={formik.touched.password2 ? formik.errors.password2 : undefined}
                    />
                </Grid>
                <Grid item>
                    <Button type="submit" color="primary" variant="contained">
                        Register
                    </Button>
                </Grid>
                <Grid item>
                    <Button id="signinButton" color="primary" variant="contained" onClick={() => setShowSignin(true)}>
                        SignIn
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default Register;
