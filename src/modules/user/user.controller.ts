import { Request, Response } from "express";
import { createUser } from "./user.service";
import { CreateUserInput } from "./schema/user.schema";

export const createUserHandler = async (req: Request<{},{},CreateUserInput["body"]>, res: Response) => {
    try{
        const user = await createUser(req.body);
        return res.send(user);
    } catch(err: any) {
        return res.status(409).send(err.message);
    }   
};