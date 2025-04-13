import { Router } from "express";
import authRouter from "./auth.api";
const router = Router();

router.use("/auth", authRouter);

router.get("/", (req, res) => {
  res.json({ message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄" });
});

export default router;
