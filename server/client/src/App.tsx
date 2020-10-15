import { MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Routes from "./components/Routes";
import theme from "./theme";

function App(props: RouteComponentProps<{}>) {
    return (
        <div className="App">
            <MuiThemeProvider theme={theme}>
                <NavBar />
                <Routes {...props} />
            </MuiThemeProvider>
        </div>
    );
}

export default App;
