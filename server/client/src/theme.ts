import { createMuiTheme } from "@material-ui/core";
import "fontsource-roboto";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#3949ab",
            light: "#6e74dc",
            dark: "#00227a",
        },
        secondary: {
            main: "#e65100",
            light: "#ff833a",
            dark: "#ac1900",
        },
    },
    typography: {
        fontFamily: "roboto",
    },
});

export default theme;
