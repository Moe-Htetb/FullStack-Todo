import { Request, Response } from "express";
import { Users } from "../models/User";
import asyncHandler from "../utils/asyncHandler";

export const registerController = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "email already exist" });
      throw new Error("registerController Error");
    }

    const newUser = await Users.create({ name, email, password });
    if (newUser) {
      res.status(200);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });
    } else {
      res.status(400);
      throw new Error("registerController Error");
    }
  }
);
