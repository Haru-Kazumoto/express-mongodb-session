import mongoose from "mongoose";
import logger from "./logger";

export default class Connection {
    async connectDB() {
        try{
            await mongoose.connect(process.env.DB_URI as string);
            logger.info("Mongodb successfully connected");
        } catch {
            logger.error("Mongodb failed to connect due to error, please try again");
            process.exit(1);
        }
    }
}