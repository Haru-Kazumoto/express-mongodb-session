import express, { NextFunction, Request, Response } from "express";
import { validateChecker } from "../../middleware/validate-resource.middleware";
import { registerUserHandler } from "./auth.controller";
import { registerUserSchema } from "./schema/auth.schema";
import { localAuthChecker } from "../../middleware/local-auth.middleware";
import { authenticatedChecker } from "../../middleware/authenticated.middleware";

const router = express.Router();

{
    router.get("/get-session");
    router.post("/register", validateChecker(registerUserSchema), registerUserHandler);
    router.post('/login', localAuthChecker);
    router.post('/logout', authenticatedChecker, (req: Request, res: Response) => {
        req.session.destroy(() => {
            return res.status(200).json({
                status: res.statusCode,
                message: "Logout success"
            });
        });
    });
}

export default router;