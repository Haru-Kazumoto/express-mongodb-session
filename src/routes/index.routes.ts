import express from "express";
import userRoutes from "../modules/user/user.routes";
import authRoutes from "../modules/auth/auth.routes";

const router = express.Router();

{
    router.use("/user", userRoutes);
    router.use("/auth", authRoutes);
}

export default router;