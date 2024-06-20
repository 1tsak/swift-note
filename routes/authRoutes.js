import express from "express";
import { signIn, signUp } from "../controllers/authController.js";
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("auth/login");
});
router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await signIn(email, password);
    if (!data) {
      return res
        .status(400)
        .render("/auth/login", { error: "Invalid login credentials" });
    }
    req.session.user = data.user;
    req.session.token = data.token;
    return res.status(200).redirect("/notes");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await signUp(email, password);
    if (!data) {
      return res.status(400).json({ error: "User Already Exists!" });
    }
    return res.status(200).redirect("/notes");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/signout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Could not sign out. Try again.");
    }
    res.redirect("/");
  });
});

export default router;
