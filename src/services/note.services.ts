import { QueryOptions, UpdateQuery } from "mongoose";
import { INote } from "../interfaces/note.interface";
import NoteModel from "../models/note.model";

export async function findNotesByUserId(userId: string) {
  return await NoteModel.find({ userId: userId });
}

export async function findNoteById(id: string) {
  return await NoteModel.findById(id);
}

export async function createNote(noteData: Partial<INote>) {
  try {
    const result = await NoteModel.create(noteData);
    return { data: result, success: true };
  } catch (error) {
    throw error;
  }
}

export async function deleteNoteById(id: string) {
  return await NoteModel.findByIdAndDelete(id);
}

export async function updateNoteById(
  id: string,
  update: UpdateQuery<INote>,
  options: QueryOptions = { new: true }
) {
  try {
    const result = await NoteModel.findByIdAndUpdate(id, update, options);
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
}
