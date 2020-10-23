import React, { createContext, Dispatch, FunctionComponent, ReactNode, SetStateAction, useMemo, useState } from "react";
import { SearchedUser } from "../../../../interfaces/user.interfaces";

export type ProfileContextObject = {
    profileOwner: SearchedUser | null;
    setProfileOwner: Dispatch<SetStateAction<SearchedUser | null>>;
};

type Props = {
    children: ReactNode;
};

export const deafultContextValue: ProfileContextObject = {
    profileOwner: null,
    setProfileOwner: () => {},
};

const ProfileContext = createContext<ProfileContextObject>(deafultContextValue);

const ProfileContextProvider: FunctionComponent<Props> = ({ children }) => {
    const [profileOwner, setProfileOwner] = useState<SearchedUser | null>(null);

    const ProfileContextValue: ProfileContextObject = useMemo(() => {
        const value = { profileOwner, setProfileOwner };
        return value;
    }, [profileOwner, setProfileOwner]);
    return <ProfileContext.Provider value={ProfileContextValue}>{children}</ProfileContext.Provider>;
};

export { ProfileContext, ProfileContextProvider };
