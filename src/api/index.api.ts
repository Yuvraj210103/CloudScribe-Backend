import { Router } from "express";
import authRouter from "./auth.api";
import noteRouter from "./note.api";
const router = Router();

router.use("/auth", authRouter);
router.use("/notes", noteRouter);

router.get("/", (req, res) => {
  res.json({ message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄" });
});

export default router;
