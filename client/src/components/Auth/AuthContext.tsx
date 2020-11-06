import React, {
    createContext,
    FunctionComponent,
    Dispatch,
    useMemo,
    useState,
    SetStateAction,
    ReactNode,
    useCallback,
} from "react";
import api from "../../api";
import { ResponseUser } from "../../../../interfaces/user.interfaces";

export type AuthContextObject = {
    isAuthenticated: () => Promise<void>;
    authenticated: boolean;
    setAuthenticated: Dispatch<SetStateAction<boolean>>;
    user: ResponseUser | null;
    setUser: Dispatch<SetStateAction<ResponseUser | null>>;
    signOut: () => Promise<void>;
};

type Props = {
    children: ReactNode;
};

export const defaultAuthContextValue: AuthContextObject = {
    isAuthenticated: () => new Promise(() => false),
    authenticated: false,
    setAuthenticated: () => {},
    user: null,
    setUser: () => {},
    signOut: () => new Promise(() => {}),
};

const AuthContext = createContext<AuthContextObject>(defaultAuthContextValue);

const AuthContextProvider: FunctionComponent<Props> = ({ children }) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<ResponseUser | null>(null);

    const isAuthenticated = useCallback(async (): Promise<void> => {
        try {
            const response = await api.get("auth/authenticate");
            setAuthenticated(response.data.isAuthenticated);
            if (!user) {
                setUser(response.data.user);
            }
        } catch (error) {
            setAuthenticated(false);
            setUser(null);
        }
    }, [user]);

    const signOut = useCallback(async () => {
        try {
            await api.get("auth/signout");
            setAuthenticated(false);
            setUser(null);
        } catch (err) {
            console.log("Error : ", err);
            throw err;
        }
    }, []);

    const AuthContextValue: AuthContextObject = useMemo(() => {
        const value = {
            isAuthenticated,
            authenticated,
            setAuthenticated,
            user,
            setUser,
            signOut,
        };
        return value;
    }, [isAuthenticated, authenticated, setAuthenticated, user, setUser, signOut]);

    return <AuthContext.Provider value={AuthContextValue}>{children}</AuthContext.Provider>;
};

export { AuthContextProvider, AuthContext };
