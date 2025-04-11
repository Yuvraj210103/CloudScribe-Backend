import NoteModel from "../models/note.model";

export async function findNotesByUserId(userId: string) {
  return await NoteModel.find({ userId: userId });
}
