import { ServiceResponse } from "./../interfaces/user.interfaces";
import { NextFunction, Request, Response } from "express";
import { UserInterface } from "../interfaces/user.interfaces";
import { registerNewUser } from "../service/auth.service";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const user: UserInterface = req.body;
    const result: ServiceResponse<UserInterface> = await registerNewUser(user);
    if (result.error) {
        res.status(result.statusCode).json({ message: result.message });
    } else {
        res.status(200).json({ user: result.data });
    }
};
