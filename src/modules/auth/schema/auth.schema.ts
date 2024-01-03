import { object, string } from "zod";

export const registerUserSchema = object({
    body: object({
        name: string({
            required_error: "Name is required"
        }),
        username: string({
            required_error: "Username is required"
        }),
        email: string({
            required_error: "Email id required"
        }).email("Email pattern doesn't valid"),    
        password: string({
            required_error: "Password is required"
        }).min(6, "Minimum of password is 6 character")
    })
});

export const loginUserSchema = object({
    body: object({
        username: string({
            required_error: "Username is required"
        }),
        password: string({
            required_error: "Password is required"
        }),
    }),
});