import { MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./components/auth/AuthContext";
import NavBar from "./components/NavBar";
import Routes from "./components/Routes";
import theme from "./theme";

function App(props: RouteComponentProps<{}>) {
    return (
        <AuthContextProvider>
            <MuiThemeProvider theme={theme}>
                <NavBar />
                <div style={{ marginTop: 70 }}>
                    <Routes {...props} />
                </div>
            </MuiThemeProvider>
        </AuthContextProvider>
    );
}

export default App;
