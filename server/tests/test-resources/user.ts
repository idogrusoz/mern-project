import { UserInterface, SignInUser, ResponseUser } from "../../interfaces/user.interfaces";
export const mockUser: UserInterface = {
    displayName: "displayName",
    firstName: "firstName",
    lastName: "lastName",
    email: `testUser@test.test`,
    password: "password",
    userName: "userName",
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
    email: `testUser@test.test`,
    userName: "userName",
};

export const responseUser2: ResponseUser = {
    _id: "userId2",
    displayName: "displayName",
    firstName: "firstName",
    lastName: "lastName",
    email: `test2@test.test`,
    userName: "userName",
};

export const userWithCorrectPassword: SignInUser = {
    email: `testUser@test.test`,
    password: "password",
};

export const userWithWrongPassword: SignInUser = {
    email: `testUser@test.test`,
    password: "wrong",
};
