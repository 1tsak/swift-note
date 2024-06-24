import express from "express";
import session from 'express-session';
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import notesRoutes from "./routes/noteRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { auth } from "./middleware/auth.js";
import path from "path"
dotenv.config();
const app = express();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const __dirname = path.resolve();

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Session configuration
app.use(session({
  secret: 'notesapp',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// ROUTES
app.use("/auth",authRoutes)
app.use("/",auth,notesRoutes);

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch(() => {
    console.error("Unable to connect to database!");
  });

app.listen(PORT, () => {
  console.log(`Server started on http://127.0.0.1:${PORT}`);
});
