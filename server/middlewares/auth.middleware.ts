import { NextFunction, Request, Response } from "express";
import { ResponseUser } from "../interfaces/user.interfaces";
import { verifyToken } from "../service/auth.service";
import { tokenExtractor } from "../utils/tokenExtractor";
import { ServiceResponse } from "../utils/serviceResponse";

export const verification = async (req: Request, res: Response, next: NextFunction) => {
    const token: string = tokenExtractor(req.headers);
    const { error, message, statusCode, data }: ServiceResponse<ResponseUser> = await verifyToken(token);
    if (error) {
        res.send(statusCode).json({ message });
    } else {
        req.body.user = data;
        next();
    }
};
