import { Router } from "express";
import { registerUser } from "../controller/auth/register.auth.controller";
import { activateUser } from "../controller/auth/activate.auth.controller";
import { forgotPassword } from "../controller/auth/forgot.auth.controller";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/activate", activateUser);
authRouter.post("/forgot", forgotPassword);

export default authRouter;
