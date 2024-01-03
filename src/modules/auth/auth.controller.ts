import { Request, Response } from "express";
import { registerUser } from "./auth.service";
 
export const registerUserHandler = async (req: Request, res: Response) => {
    const user = await registerUser(req.body, res);

    return res.send(user);
}

export const loginUserHandler = (req: Request, res: Response) => {
    return null;
}

export const getSessionUserHandler = (req: Request, res: Response) => {
    return null;
}