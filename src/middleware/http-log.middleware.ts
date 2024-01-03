import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

export const logRequestChecker = (req: Request, res: Response, next: NextFunction) => {
    res.on('finish', () => {
        if(res.statusCode >= 400){
            logger.error(`Incoming request [${req.originalUrl}] - [${res.statusCode}]`);
        } else if (res.statusCode >= 500){
            logger.error(`Incoming request [${req.originalUrl}] - [${res.statusCode}]`);
        } else {
            logger.info(`Incoming request [${req.originalUrl}] - [${res.statusCode}]`);
        }
    });
    next();
}