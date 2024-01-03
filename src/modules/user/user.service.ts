import { userDb } from "../../db/repository.db";
import { UserInput } from "./user.model";

export async function createUser(input: UserInput){
    try{
        await checkDuplicateData(input.username, "Username already exists");
        await checkDuplicateData(input.email, "Email in used");

        return await userDb.create(input);
    } catch(err: any){
        throw new Error(err);
    }
}

export async function validateUser(username: string, password: string) {
    const user = await userDb.findOne({username});
    if(!user) return false;

    const isValid = await user.comparePassword(password);

    if(!isValid) return false;

    return false;
}


async function checkDuplicateData(field: any, message: string): Promise<void>{
    const findData = await userDb.findOne({field});
    if(findData) throw new Error(message);
}