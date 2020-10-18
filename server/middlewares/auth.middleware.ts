import { NextFunction, Request, Response } from "express";
import { ResponseUser } from "../interfaces/user.interfaces";
import { verifyToken } from "../service/auth.service";
import { tokenExtractor } from "../utils/tokenExtractor";
import { ServiceResponse } from "../utils/serviceResponse";

export const verification = async (req: Request, res: Response, next: NextFunction) => {
    const token: string = tokenExtractor(req.headers);
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const { error, message, statusCode, data }: ServiceResponse<ResponseUser> = await verifyToken(token);
    if (error) {
        return res.status(statusCode).json({ message });
    }
    req.body.user = data;
    req.body.token = token;
    next();
};
