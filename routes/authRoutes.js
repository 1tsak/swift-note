import express from "express";
import { signIn, signUp } from "../controllers/authController.js";
const router = express.Router();

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await signIn(email, password);
    if (!data) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid login credentials" });
    }
    return res.status(200).json({
      error: false,
      message: "Signed In Successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
});
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await signUp(email, password);
    if (!data) {
      return res
        .status(400)
        .json({ error: true, message: "User Already Exists!" });
    }
    return res.status(200).json({
      error: false,
      message: "Signed Up Successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
});
export default router