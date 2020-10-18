import { ResponseUser } from "./../interfaces/user.interfaces";
import { NextFunction, Request, Response } from "express";
import { BaseUser } from "../interfaces/user.interfaces";
import { registerNewUser, signInUser, signToken } from "../service/auth.service";
import { ServiceResponse } from "../utils/serviceResponse";

export const register = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const { error, message, statusCode, data }: ServiceResponse<BaseUser> = await registerNewUser(req.body);
        return res.status(statusCode).json({ error, message, user: data });
    } catch (error) {
        return res.status(500).json({ message: "An error occured :" + error.message });
    }
};

export const signIn = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const { error, message, statusCode, data }: ServiceResponse<ResponseUser> = await signInUser(req.body);
        if (error) {
            return res.status(statusCode).json({ message });
        }
        const token = signToken(data!._id);
        return res.cookie("access_token", token, { httpOnly: true, sameSite: true }).json({
            isAuthenticated: true,
            user: data,
            token,
        });
    } catch (error) {
        return res.status(500).json({ message: "An error occured :" + error.message });
    }
};

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        return res.status(200).json({ isAuthenticated: true, user: req.body.user, token: req.body.token });
    } catch (error) {
        return res.status(500).json({ message: "An error occured :" + error.message });
    }
};

export const signOut = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        return res.cookie("access_token", "", { expires: new Date() }).json({ isAuthenticated: false });
    } catch (error) {
        return res.status(500).json({ message: "An error occured :" + error.message });
    }
};
