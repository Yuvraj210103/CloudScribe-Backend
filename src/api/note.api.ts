import { Router } from "express";
import { authJWT } from "../middleware/authJWT.middleware";
import { fetchNotes } from "../controller/notes/fetch.notes.controller";
import { createNotes } from "../controller/notes/create.notes.controller";
import { fetchSingleNote } from "../controller/notes/fetchSingle.notes.controller";

const noteRouter = Router();

noteRouter.get("/", authJWT, fetchNotes);
noteRouter.get("/:id", authJWT, fetchSingleNote);
noteRouter.post("/create", authJWT, createNotes);

export default noteRouter;
