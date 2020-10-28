import React, { FunctionComponent, useContext, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "./Auth/AuthContext";

type ProtectedRouteProps = {
    children: JSX.Element;
    path: string;
};

const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({ children }) => {
    const { authenticated } = useContext(AuthContext);

    return (
        <Route
            render={({ location }) =>
                authenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default ProtectedRoute;
