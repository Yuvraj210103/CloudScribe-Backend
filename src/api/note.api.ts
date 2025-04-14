import { Router } from "express";
import { authJWT } from "../middleware/authJWT.middleware";
import { fetchNotes } from "../controller/notes/fetch.notes.controller";
import { createNotes } from "../controller/notes/create.notes.controller";
import { fetchSingleNote } from "../controller/notes/fetchSingle.notes.controller";
import { deleteNote } from "../controller/notes/delete.notes.controller";
import { updateNotes } from "../controller/notes/update.notes.controller";

const noteRouter = Router();

noteRouter.post("/create", authJWT, createNotes);
noteRouter.get("/", authJWT, fetchNotes);
noteRouter.get("/:id", authJWT, fetchSingleNote);
noteRouter.delete("/:id", authJWT, deleteNote);
noteRouter.put("/update/:id", authJWT, updateNotes);

export default noteRouter;
