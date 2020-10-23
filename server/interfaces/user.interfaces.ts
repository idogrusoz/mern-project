export interface BaseUser {
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    userName: string;
    image?: string;
}

export interface UserInterface extends BaseUser {
    password: string;
}

export interface ResponseUser extends BaseUser {
    _id: string;
}

export interface SignInUser {
    email: string;
    password: string;
}

export interface SearchedUser {
    _id: string;
    userName: string;
    image: string;
    displayName: string;
}
