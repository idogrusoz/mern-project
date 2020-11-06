import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route } from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Route component={App} />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root"),
);
serviceWorker.unregister();
