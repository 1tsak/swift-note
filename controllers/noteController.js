import { Note } from "../models/Note.js";

export const getNotes = async (userId) => {
  try {
    const notes = await Note.find({ userId });
    return notes;
  } catch (error) {
    throw error;
  }
};
export const addNote = async (userId, note) => {
  try {
    const newNote = new Note({ userId, ...note });
    await newNote.save();
    return newNote;
  } catch (error) {
    throw error;
  }
};
export const updateNote = async (id, updatedNote) => {
  try {
    const note = await Note.findByIdAndUpdate(id, updatedNote);
    console.log(note)
    return note;
  } catch (error) {
    throw error;
  }
};
export const deleteNote = async (id) => {
  try {
    await Note.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};
