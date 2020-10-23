import { MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./components/Auth/AuthContext";
import NavBar from "./components/NavBar/NavBar";
import { ProfileContextProvider } from "./components/Profile/ProfileContext";
import Routes from "./components/Routes";
import theme from "./theme";

function App(props: RouteComponentProps<{}>) {
    return (
        <AuthContextProvider>
            <ProfileContextProvider>
                <MuiThemeProvider theme={theme}>
                    <NavBar />
                    <div style={{ marginTop: 70 }}>
                        <Routes {...props} />
                    </div>
                </MuiThemeProvider>
            </ProfileContextProvider>
        </AuthContextProvider>
    );
}

export default App;
