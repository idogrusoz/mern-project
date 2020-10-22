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

export const mockUsersArray: UserInterface[] = [
    {
        displayName: "Doe",
        firstName: "John",
        lastName: "Jon Doe",
        email: `johndoe@test.test`,
        password: "password",
        userName: "noone",
    },
    {
        displayName: "jane doe",
        firstName: "jane",
        lastName: "janeDoe",
        email: `janedoe@test.test`,
        password: "password",
        userName: "noonesWife",
    },
    {
        displayName: "ahmet",
        firstName: "isim",
        lastName: "soyad",
        email: `posta@test.test`,
        password: "password",
        userName: "lakap",
    },
    {
        displayName: "ali desidero",
        firstName: "ali",
        lastName: "desidero",
        email: `postaci@test.test`,
        password: "password",
        userName: "nik",
    },
    {
        displayName: "panter cemil",
        firstName: "panter",
        lastName: "cemil",
        email: `kestane@test.test`,
        password: "password",
        userName: "postane",
    },
];
