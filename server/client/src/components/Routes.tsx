import React from "react";
import { Route, RouteComponentProps, Router, Switch } from "react-router-dom";
import Landing from "./Landing";

const Routes = ({ history, location }: RouteComponentProps<{}>) => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Landing} />
            </Switch>
        </Router>
    );
};

export default Routes;
