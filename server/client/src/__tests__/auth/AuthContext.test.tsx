jest.mock("../../api.ts");
import React, { useContext } from "react";
import { AuthContextProvider, AuthContext } from "../../components/auth/AuthContext";
import { ResponseUser } from "../../../../interfaces/user.interfaces";
import { act } from "@testing-library/react";
import ReactDOM from "react-dom";
import api from "../../api";

describe("Auth context test", () => {
    let container: HTMLDivElement | null;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        act(() => {
            ReactDOM.render(
                <AuthContextProvider>
                    <TestComponent />{" "}
                </AuthContextProvider>,
                container,
            );
        });
    });

    afterEach(() => {
        document.body.removeChild(container as HTMLDivElement);
        container = null;
    });

    const mockUser: ResponseUser = {
        _id: "userId",
        firstName: "firstName",
        lastName: "lastName",
        displayName: "displayName",
        email: "email",
    };
    const TestComponent = () => {
        const { authenticated, user, setUser, logOut } = useContext(AuthContext);
        return (
            <>
                <p data-testid="authenticated">{authenticated.toString()}</p>
                {user && <p data-testid="user">{user?.firstName}</p>}
                <button onClick={() => setUser(mockUser)}>SetUser</button>
                <button onClick={logOut}>LogOut</button>
            </>
        );
    };

    it("Has default values", () => {
        const values = container!.querySelectorAll("p");
        expect(values.length).toBe(1);
        expect(values[0].textContent).toBe("false");
    });
    it("Provides context values", () => {
        const button = container!.querySelector("button");
        act(() => {
            button!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        const values = container!.querySelectorAll("p");
        expect(values.length).toBe(2);
        expect(values[1].textContent).toBe("firstName");
    });
    it("Logout makes an api call", () => {
        const button = container!.querySelectorAll("button");
        act(() => {
            button![1].dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(api.get).toBeCalled();
    });
});
