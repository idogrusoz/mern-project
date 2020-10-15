import React, {
    createContext,
    FunctionComponent,
    Dispatch,
    useMemo,
    useState,
    SetStateAction,
    ReactNode,
    useCallback,
    useEffect,
} from "react";
import api from "../../api";
import { ResponseUser, SignInUser, UserInterface } from "../../../../interfaces/user.interfaces";

type AuthContextObject = {
    // isAuthenticated: () => Promise<void>;
    authenticated: boolean;
    user: ResponseUser | null;
    setUser: Dispatch<SetStateAction<ResponseUser | null>>;
    logOut: () => Promise<void>;
    firstName: string;
    setFirstName: Dispatch<SetStateAction<string>>;
    lastName: string;
    setLastName: Dispatch<SetStateAction<string>>;
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    password2: string;
    setPassword2: Dispatch<SetStateAction<string>>;
    error: boolean;
    setError: Dispatch<SetStateAction<boolean>>;
    errorMessage: string;
    setErrorMessage: Dispatch<SetStateAction<string>>;
    showSignin: boolean;
    setShowSignin: Dispatch<SetStateAction<boolean>>;
    register: () => void;
    signin: () => void;
};

type Props = {
    children: ReactNode;
};

const defaultCotextValue: AuthContextObject = {
    // isAuthenticated: () => new Promise(() => false),
    authenticated: false,
    user: null,
    setUser: () => {},
    logOut: () => new Promise(() => {}),
    firstName: "",
    setFirstName: () => {},
    lastName: "",
    setLastName: () => {},
    email: "",
    setEmail: () => {},
    password: "",
    setPassword: () => {},
    password2: "",
    setPassword2: () => {},
    error: false,
    setError: () => {},
    errorMessage: "",
    setErrorMessage: () => {},
    showSignin: true,
    setShowSignin: () => {},
    register: () => {},
    signin: () => {},
};

const AuthContext = createContext<AuthContextObject>(defaultCotextValue);

const AuthContextProvider: FunctionComponent<Props> = ({ children }) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<ResponseUser | null>(null);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [showSignin, setShowSignin] = useState<boolean>(false);
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
        }
    }, []);

    const buildUser = useCallback((): UserInterface => {
        return {
            firstName,
            lastName,
            displayName: firstName + " " + lastName,
            email,
            password,
        };
    }, [firstName, lastName, email, password]);

    const register = useCallback(async () => {
        const user = buildUser();
        try {
            const response = await api.post("auth/register", user);
            setShowSignin(response.status === 200);
        } catch (error) {
            setError(true);
            setErrorMessage(error.message);
        }
    }, [buildUser]);

    const signin = useCallback(async () => {
        const body: SignInUser = { email, password };
        try {
            const response = await api.post("auth/signin", body);
            console.log(1111111111111, response.data.isAuthenticated);
            setAuthenticated(response.data.isAthenticated);
            setUser(response.data.user);
        } catch (error) {
            setError(true);
            setErrorMessage(error.message);
        }
    }, [email, password]);

    const AuthContextValue: AuthContextObject = useMemo(() => {
        const value = {
            // isAuthenticated,
            authenticated,
            user,
            setUser,
            logOut,
            firstName,
            lastName,
            email,
            password,
            password2,
            setFirstName,
            setLastName,
            setEmail,
            setPassword,
            setPassword2,
            error,
            setError,
            errorMessage,
            setErrorMessage,
            showSignin,
            setShowSignin,
            register,
            signin,
        };
        return value;
    }, [
        // isAuthenticated,
        user,
        setUser,
        authenticated,
        logOut,
        email,
        error,
        errorMessage,
        firstName,
        lastName,
        password,
        password2,
        register,
        showSignin,
        signin,
    ]);

    return <AuthContext.Provider value={AuthContextValue}>{children}</AuthContext.Provider>;
};

export { AuthContextProvider, AuthContext };
