import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { UserDocument } from "modules/user/user.model";

export const localAuthChecker = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err: Error, user: UserDocument) => {
        if(err) {
            res.sendStatus(401);
            return next(err);
        }
        
        req.logIn(user, (loginErr) => {
            if(loginErr) return next(loginErr);

            return res.status(201).json({
                statusCode: res.statusCode,
                message: "Login success"
            });
        });
    })(req,res,next);
}