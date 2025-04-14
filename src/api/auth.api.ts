import { Router } from "express";
import { registerUser } from "../controller/auth/register.auth.controller";
import { activateUser } from "../controller/auth/activate.auth.controller";
import { forgotPassword } from "../controller/auth/forgot.auth.controller";
import { resetPassword } from "../controller/auth/reset.auth.controller";
import { login } from "../controller/auth/login.auth.controller";
import { fetchAuthUser } from "../controller/auth/fetchUser.auth.controller";
import { authJWT } from "../middleware/authJWT.middleware";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/activate", activateUser);
authRouter.post("/forgot", forgotPassword);
authRouter.post("/resetPassword", resetPassword);
authRouter.post("/login", login);
authRouter.get("/", authJWT, fetchAuthUser);

export default authRouter;
