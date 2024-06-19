import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  if (!req.header("Authorization")) {
    return res.status(401).send({ error: "Unauthorized Request" });
  }
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({ error: "Unauthorized Request" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401).send({ error: "User doesn't exists!" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Invalid token!" });
  }
};
