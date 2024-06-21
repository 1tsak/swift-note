import express from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.post(
  "/login",
  [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("auth/login", { errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const data = await signIn(email, password);
      if (!data) {
        return res
          .status(400)
          .render("auth/login", { error: "Invalid login credentials" });
      }
      req.session.user = data.user;
      req.session.token = data.token;
      return res.status(200).redirect("/");
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

router.post(
  "/signup",
  [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("auth/signup", { errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const data = await signUp(email, password);
      if (!data) {
        return res.render("auth/signup", { error: "User Already Exists!" });
      }
      return res.status(200).redirect("/");
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

router.post("/signout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Could not sign out. Try again.");
    }
    res.redirect("/");
  });
});

export default router;
