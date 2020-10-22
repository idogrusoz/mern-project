import React from "react";
import { createMemoryHistory } from "history";
import * as ReactRouterDom from "react-router-dom";
import Routes from "../components/Routes";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";

describe("Routes test", () => {
    it("renders without crash", () => {
        const location = { ...window.location, state: "/" };
        const history = createMemoryHistory();
        const match: ReactRouterDom.match = {
            isExact: true,
            params: {},
            path: "/",
            url: "",
        };
        const tree = render(<Routes history={history} location={location} match={match} />, { wrapper: MemoryRouter });
        expect(tree).toMatchSnapshot();
    });
});
