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

type AuthContextObject = {
    // isAuthenticated: () => Promise<void>;
    authenticated: boolean;
    setAuthenticated: Dispatch<SetStateAction<boolean>>;
    user: ResponseUser | null;
    setUser: Dispatch<SetStateAction<ResponseUser | null>>;
    logOut: () => Promise<void>;
};

type Props = {
    children: ReactNode;
};

const defaultCotextValue: AuthContextObject = {
    // isAuthenticated: () => new Promise(() => false),
    authenticated: false,
    setAuthenticated: () => {},
    user: null,
    setUser: () => {},
    logOut: () => new Promise(() => {}),
};

const AuthContext = createContext<AuthContextObject>(defaultCotextValue);

const AuthContextProvider: FunctionComponent<Props> = ({ children }) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<ResponseUser | null>(null);

    // Tobe uncommented once API route s built
    // const isAuthenticated = useCallback(async (): Promise<void> => {
    //     try {
    //         const response = await api.get("auth/authenticated");
    //         console.log(response.status);
    //         setAuthenticated(response.data.isAuthenticated);
    //         if (!user) {
    //             setUser(response.data.user);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         setAuthenticated(false);
    //         setUser(null);
    //     }
    // }, [user]);

    // useEffect(() => {
    //     const fetch = () => {
    //         isAuthenticated();
    //     };
    //     fetch();
    // }, [isAuthenticated]);

    const logOut = useCallback(async () => {
        try {
            await api.get("auth/logout");
        } catch (err) {
            console.log("Error : ", err);
            throw err;
        }
    }, []);

    const AuthContextValue: AuthContextObject = useMemo(() => {
        const value = {
            // isAuthenticated,
            authenticated,
            setAuthenticated,
            user,
            setUser,
            logOut,
        };
        return value;
    }, [
        // isAuthenticated,
        authenticated,
        setAuthenticated,
        user,
        setUser,
        logOut,
    ]);

    return <AuthContext.Provider value={AuthContextValue}>{children}</AuthContext.Provider>;
};

export { AuthContextProvider, AuthContext };
