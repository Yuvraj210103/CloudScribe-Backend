import { Router } from "express";
import { registerUser } from "../controller/auth/register.auth.controller";
import { activateUser } from "../controller/auth/activate.auth.controller";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/activate", activateUser);

export default authRouter;
