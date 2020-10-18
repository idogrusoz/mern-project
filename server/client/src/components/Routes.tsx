import React, { useContext, useEffect, useState } from "react";
import { Route, RouteComponentProps, Router, Switch } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";
import Landing from "./auth/Landing";
import Profile from "./Profile";

const Routes = ({ history, location }: RouteComponentProps<{}>) => {
    const [loading, setLoading] = useState<boolean>(true);
    const { authenticated, user, isAuthenticated } = useContext(AuthContext);
    const fetch = () => {
        isAuthenticated()
            .then(() => setLoading(false))
            .catch((err) => console.log("Error: ", err));
    };
    useEffect(fetch, []);
    return !loading ? (
        <Router history={history}>
            {authenticated && user ? (
                <Switch>
                    <Route exact path="/" component={Profile} />
                </Switch>
            ) : (
                <Route exact path="/" component={Landing} />
            )}
        </Router>
    ) : (
        <h1>Loading</h1>
    );
};

export default Routes;
