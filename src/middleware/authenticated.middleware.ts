import { NextFunction, Request, Response } from "express";

export const authenticatedChecker = (req: Request, res: Response, next: NextFunction) => {
    if(req.isAuthenticated()) return next();
    if(req.isUnauthenticated()) return res.status(401).json({
        statusCode: res.statusCode,
        message: "Unauthorized"
    });
}