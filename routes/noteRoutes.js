import express from "express";
import {
  addNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../controllers/noteController.js";
import { Note } from "../models/Note.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const notes = await getNotes(req.user.id);
    res.render("notes", { notes, user: req.session.user });
  } catch (error) {
    res.status(500).render("notes", { error: error.message });
  }
});

router.get("/create", (req, res) => {
  res.render("notes/create", { user: req.session.user });
});

router.post("/", async (req, res) => {
  const { note } = req.body;
  try {
    await addNote(req.user.id, note);
    res.status(201).redirect("/");
  } catch (error) {
    res.status(500).render("notes/add", { error: error.message });
  }
});

router.get("/edit/:noteId", async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);
    if (!note || note.userId.toString() !== req.user.id) {
      return res.status(404).redirect("/");
    }
    res.render("notes/edit", { note, user: req.session.user });
  } catch (error) {
    res.status(500).redirect("/");
  }
});

router.post("/:noteId", async (req, res) => {
  const noteId = req.params.noteId;
  const { note: updatedNote } = req.body;
  try {
    const data = await updateNote(noteId, updatedNote);
    if (!data) {
      return res.status(400).redirect("/");
    }
    res.status(200).redirect("/");
  } catch (error) {
    res.status(500).redirect("/");
  }
});

router.post("/delete/:noteId", async (req, res) => {
  try {
    const noteId = req.params.noteId;
    await deleteNote(noteId);
    res.status(200).redirect("/");
  } catch (error) {
    res.status(500).redirect("/");
  }
});
export default router;
