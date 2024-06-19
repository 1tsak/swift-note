import express from "express";
import {
  addNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../controllers/noteController.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const notes = await getNotes(req.user._id);
    return res
      .status(200)
      .json({ error: false, message: "Notes Fetched!", data: notes });
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { note, } = req.body;
  try {
    await addNote(req.user._id,note);
    return res.status(201).json({ error: false, message: "Note Added!" });
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
});
router.put("/:noteId", async (req, res) => {
  const noteId = req.params.noteId;
  const { note:updatedNote } = req.body;
  try {
    const data = await updateNote(noteId, updatedNote);
    if (!data) {
      return res
        .status(400)
        .json({ error: true, message: "Unable to find note!" });
    }
    return res.status(200).json({ error: false, message: "Note Updated!" });
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
});
router.delete("/:noteId", async (req, res) => {
  try {
    const noteId = req.params.noteId;
    await deleteNote(noteId);
    return res.status(200).json({ error: false, message: "Note Deleted!" });
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
});
export default router;
