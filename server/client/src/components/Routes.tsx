import React, { useContext } from "react";
import { Route, RouteComponentProps, Router, Switch } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";
import Landing from "./auth/Landing";
import Profile from "./Profile";

const Routes = ({ history, location }: RouteComponentProps<{}>) => {
    const { authenticated, user } = useContext(AuthContext);
    return (
        <Router history={history}>
            {authenticated && user ? (
                <Switch>
                    <Route exact path="/" component={Profile} />
                </Switch>
            ) : (
                <Route exact path="/" component={Landing} />
            )}
        </Router>
    );
};

export default Routes;
