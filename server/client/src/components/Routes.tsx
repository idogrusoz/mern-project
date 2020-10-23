import React, { useContext, useEffect, useState } from "react";
import { Route, RouteComponentProps, Router, Switch } from "react-router-dom";
import AddPost from "./AddPost/AddPost";
import { AuthContext } from "./Auth/AuthContext";
import Landing from "./Auth/Landing";
import Profile from "./Profile";

const Routes = ({ history, location }: RouteComponentProps<{}>) => {
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
            {authenticated && user ? (
                <Switch>
                    <Route exact path="/" component={Profile} />
                    <Route path="/username/:username" component={Profile} />
                    <Route path="/add-post" component={AddPost} />
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
