import { ServiceResponse } from "./../interfaces/user.interfaces";
import { NextFunction, Request, Response } from "express";
import { UserInterface } from "../interfaces/user.interfaces";
import { registerNewUser } from "../service/auth.service";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const user: UserInterface = req.body;
    const { error, message, statusCode, data }: ServiceResponse<UserInterface> = await registerNewUser(user);
    if (error) {
        res.status(statusCode).json({ message });
    } else {
        res.status(200).json({ user: data });
    }
};
