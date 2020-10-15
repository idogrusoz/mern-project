import { ResponseUser } from "./../interfaces/user.interfaces";
import { NextFunction, Request, Response } from "express";
import { BaseUser } from "../interfaces/user.interfaces";
import { registerNewUser, signInUser, signToken } from "../service/auth.service";
import { ServiceResponse } from "../utils/serviceResponse";

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { error, message, statusCode, data }: ServiceResponse<BaseUser> = await registerNewUser(req.body);
    if (error) {
        res.status(statusCode).json({ message });
    } else {
        res.status(200).json({ user: data });
    }
};

export const signIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { error, message, statusCode, data }: ServiceResponse<ResponseUser> = await signInUser(req.body);
    if (error) {
        res.status(statusCode).json({ message });
    } else {
        const token = signToken(data!._id);
        res.cookie("access_token", token, { httpOnly: true, sameSite: true });
        res.status(200).json({ isAthenticated: true, user: data, token });
    }
};
