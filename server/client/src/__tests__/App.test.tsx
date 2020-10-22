import React from "react";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { MemoryRouter } from "react-router-dom";
import * as ReactRouterDom from "react-router-dom";
import App from "../App";

test("matches the snapshot", () => {
    const location = { ...window.location, state: "/" };
    const history = createMemoryHistory();
    const match: ReactRouterDom.match = {
        isExact: true,
        params: {},
        path: "/",
        url: "",
    };
    const app = render(<App history={history} location={location} match={match} />, { wrapper: MemoryRouter });
    expect(app).toMatchSnapshot();
});
