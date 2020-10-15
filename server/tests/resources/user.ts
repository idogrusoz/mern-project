import { UserInterface, SignInUser, ResponseUser } from "./../../interfaces/user.interfaces";
export const mockUser: UserInterface = {
    displayName: "displayName",
    firstName: "firstName",
    lastName: "lastName",
    email: `test@test.test`,
    password: "password",
};

export const mockUserWithId = {
    ...mockUser,
    _id: "userId",
};

export const responseUser: ResponseUser = {
    _id: "userId",
    displayName: "displayName",
    firstName: "firstName",
    lastName: "lastName",
    email: `test@test.test`,
};

export const userWithCorrectPassword: SignInUser = {
    email: `test@test.test`,
    password: "password",
};

export const userWithWrongPassword: SignInUser = {
    email: `test@test.test`,
    password: "wrong",
};
