import { Request, Response } from "express";
import { SearchedUser } from "../interfaces/user.interfaces";
import { isUserNameFree, search } from "../service/user.service";
import { ServiceResponse } from "../utils/serviceResponse";

export const checkUserName = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { error, message, statusCode, data }: ServiceResponse<boolean> = await isUserNameFree(req.body.value);
        return res.status(statusCode).json({ error, message, data });
    } catch (error) {
        return res.status(500).json({ message: "An error occured :" + error.message });
    }
};

export const searchUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { error, message, statusCode, data }: ServiceResponse<SearchedUser[]> = await search(req.params.term);
        return res.status(statusCode).json({ error, message, data });
    } catch (error) {
        return res.status(500).json({ message: "An error occured :" + error.message });
    }
};
