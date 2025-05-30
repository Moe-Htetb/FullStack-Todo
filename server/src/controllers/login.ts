import { Request, Response } from "express";
import { Users } from "../models/User";
import generateToken from "../utils/token";
import asyncHandler from "../utils/asyncHandler";
export const loginController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await Users.findOne({ email });

    if (existingUser && (await existingUser.matchPassword(password))) {
      generateToken(res, existingUser._id);
      res.status(201).json({
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      });
    } else {
      res.status(401);
      throw new Error("Invaild credentials.");
    }
  }
);
