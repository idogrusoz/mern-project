export interface BaseUser {
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
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
