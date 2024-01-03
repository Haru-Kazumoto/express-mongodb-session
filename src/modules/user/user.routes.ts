import express, { Request, Response } from "express";
import { validateChecker } from "../../middleware/validate-resource.middleware";
import { createUserSchema } from "./schema/user.schema";
import { createUserHandler } from "./user.controller";
import { authenticatedChecker } from "../../middleware/authenticated.middleware";
import { userDb } from "../../db/repository.db";

const router = express.Router();

{
    router.post("/create", validateChecker(createUserSchema), createUserHandler);
    router.get("/hello", authenticatedChecker, (req: Request, res: Response) => {
        return res.status(200).json({
            message: "Yey u have create authentication with session based!"
        })
    });
    router.get("/get-users", function(req: Request, res: Response) {
        return res.status(200).json({
            data: req.session,
        });
    })
}

export default router;