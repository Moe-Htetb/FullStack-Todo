import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { authRequest } from "../middleware/authMiddleware";
import { Users } from "../models/User";

export const getUserInfo = asyncHandler(
  async (req: authRequest, res: Response) => {
    const userInfo = {
      id: req.user?._id,
      name: req.user?.name,
      email: req.user?.email,
    };
    res.status(200).json(userInfo);
  }
);

export const updateUserInfo = asyncHandler(
  async (req: authRequest, res: Response) => {
    const user = await Users.findById(req.user?._id);
    if (!user) {
      res.status(404);
      throw new Error("User Not Found");
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUserInfo = await user.save();
    const exceptPassword = {
      _id: updatedUserInfo._id,
      name: updatedUserInfo.name,
      email: updatedUserInfo.email,
    };

    res.status(200).json(exceptPassword);
  }
);
