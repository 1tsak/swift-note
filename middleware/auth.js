import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  const token = req.session.token;
  if (!token) return res.status(401).redirect('auth/login');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).redirect('auth/login');
  }
};
