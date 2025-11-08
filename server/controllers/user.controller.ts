import { Context } from "hono";
import User from "../models/auth.model.js";

export const getUserProfile = async (c: Context) => {
  try {
    const user = c.get("user");
    if (!user?.id) return c.json({ error: "Unauthorized" }, 401);

    const foundUser = await User.findById(user.id).select("-password");
    if (!foundUser) return c.json({ error: "User not found" }, 404);

    return c.json({ user: foundUser });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch profile" }, 500);
  }
};
