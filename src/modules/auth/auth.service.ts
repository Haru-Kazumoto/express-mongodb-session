import { userDb } from "../../db/repository.db";
import { Response } from "express";
import { UserInput } from "modules/user/user.model";

export async function registerUser(input: UserInput, res: Response){
    await checkDuplicateData(input.username, "Username already exists", res);
    await checkDuplicateData(input.email, "Email in used", res);

    return await userDb.create(input);
}

async function checkDuplicateData(field: any, message: string, res: Response) {
    const findData = await userDb.findOne({field});
    if(findData) return res.status(409).json({
        statusCode: res.statusCode,
        message: message
    })
}