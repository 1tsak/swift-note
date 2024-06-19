import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import notesRoutes from "./routes/noteRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { auth } from "./middleware/auth.js";
dotenv.config();
const app = express();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

app.use(express.json());
app.use(cors());

// ROUTES
app.use("/",authRoutes)
app.use("/notes",auth,notesRoutes);

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch(() => {
    console.error("Unable to connect to database!");
  });

app.listen(PORT, () => {
  console.log(`Server started on https://127.0.0.1:${PORT}`);
});