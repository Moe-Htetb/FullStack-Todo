import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";

export const logoutController = asyncHandler(
  async (req: Request, res: Response) => {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "User Logut" });
  }
);
