import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const signIn = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return null;
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return {
      user,
      token,
    };
  } catch (error) {
    throw error;
  }
};

export const signUp = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      return null;
    }
    const newUser = new User({ email, password });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    return { user: newUser, token };
  } catch (error) {
    throw error;
  }
};
