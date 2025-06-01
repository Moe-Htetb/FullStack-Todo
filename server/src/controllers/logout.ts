import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";

export const logoutController = asyncHandler(
  async (req: Request, res: Response) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Cookie only over HTTPS in production
      sameSite: "none", // or "lax" depending on frontend/backend domain setup
      // path: "/", // Ensure path matches the one used when setting the cookie
    });

    res.status(200).json({ message: "User Logout" });
  }
);
