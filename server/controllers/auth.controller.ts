import { Context } from "hono";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/auth.model.js";

export const registerUser = async (c: Context) => {
  try {
    const { name, email, password } = await c.req.json();

    const existing = await User.findOne({ email });
    if (existing) {
      return c.json({ error: "Email already registered" }, 400);
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    return c.json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Registration failed" }, 500);
  }
};

export const loginUser = async (c: Context) => {
  try {
    const { email, password } = await c.req.json();
    const user = await User.findOne({ email });
    if (!user) return c.json({ error: "Invalid credentials" }, 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return c.json({ error: "Invalid credentials" }, 401);

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return c.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Login failed" }, 500);
  }
};
