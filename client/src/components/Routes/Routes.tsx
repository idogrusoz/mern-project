import { CircularProgress } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Redirect, Route, RouteComponentProps, Router, Switch } from "react-router-dom";
import AddPost from "../AddPost/AddPost";
import { AuthContext } from "../Auth/AuthContext";
import Landing from "../Auth/Landing";
import Profile from "../Profile/Profile";
import ProtectedRoute from "./ProtectedRoute";

const Routes = ({ history }: RouteComponentProps<{}>) => {
    const [loading, setLoading] = useState<boolean>(true);
    const { authenticated, user, isAuthenticated } = useContext(AuthContext);
    const fetch = () => {
        isAuthenticated()
            .then(() => {
                if (!authenticated) {
                    history.push("/");
                }
            })
            .then(() => setLoading(false))
            .catch((err) => console.log("Error: ", err));
    };
    useEffect(fetch, []);
    return !loading ? (
        <Router history={history}>
            <Switch>
                <Route exact path="/">
                    <Redirect
                        to={user && authenticated ? { pathname: `/profile/${user._id}` } : { pathname: "/login" }}
                    />
                </Route>
                <Route path="/login" component={Landing} />
                <ProtectedRoute path="/profile/:id">
                    <Profile />
                </ProtectedRoute>
                <ProtectedRoute path="/add-post">
                    <AddPost />
                </ProtectedRoute>
            </Switch>
        </Router>
    ) : (
        <div style={{ width: "100", height: "100%", display: "flex", justifyContent: "center" }}>
            <CircularProgress />
        </div>
    );
};

export default Routes;
