import React from "react";
import { createMemoryHistory } from "history";
import * as ReactRouterDom from "react-router-dom";
import { MemoryRouter } from "react-router-dom";
import Routes from "../../components/Routes/Routes";
import { AuthContext } from "../../components/Auth/AuthContext";
import { authWithoutUser, authWithUser, waitForComponentToPaint } from "../../resources/testResources";
import { mount } from "enzyme";
import Landing from "../../components/Auth/Landing";
import AddPost from "../../components/AddPost/AddPost";

describe("Routes test", () => {
    jest.spyOn(authWithoutUser, "isAuthenticated").mockImplementation(() => Promise.resolve());

    it("renders login for unauthorized attempt", async () => {
        const location = { ...window.location, state: "/profile/userId" };
        const history = createMemoryHistory({ initialEntries: ["/profile/userId"] });
        const match: ReactRouterDom.match = {
            isExact: true,
            params: {},
            path: "/profile/userId",
            url: "",
        };
        const wrapper = mount(
            <AuthContext.Provider value={authWithoutUser}>
                <MemoryRouter>
                    <Routes history={history} location={location} match={match} />
                </MemoryRouter>
            </AuthContext.Provider>,
        );
        await waitForComponentToPaint(wrapper);
        expect(wrapper.find(Landing).length).toBe(1);
    });
    it("renders login for unauthorized attempt to access add-post", async () => {
        const location = { ...window.location, state: "/add-post" };
        const history = createMemoryHistory({ initialEntries: ["/add-post"] });
        const match: ReactRouterDom.match = {
            isExact: true,
            params: {},
            path: "/add-post",
            url: "",
        };
        const wrapper = mount(
            <AuthContext.Provider value={authWithoutUser}>
                <MemoryRouter>
                    <Routes history={history} location={location} match={match} />
                </MemoryRouter>
            </AuthContext.Provider>,
        );
        await waitForComponentToPaint(wrapper);
        expect(wrapper.find(Landing).length).toBe(1);
    });
    it("renders add-post when authorized", async () => {
        const location = { ...window.location, state: "/add-post" };
        const history = createMemoryHistory({ initialEntries: ["/add-post"] });
        const match: ReactRouterDom.match = {
            isExact: true,
            params: {},
            path: "/add-post",
            url: "",
        };
        const wrapper = mount(
            <AuthContext.Provider value={authWithUser}>
                <MemoryRouter>
                    <Routes history={history} location={location} match={match} />
                </MemoryRouter>
            </AuthContext.Provider>,
        );
        await waitForComponentToPaint(wrapper);
        await waitForComponentToPaint(wrapper);
        expect(wrapper.find(AddPost).length).toBe(1);
    });
});
