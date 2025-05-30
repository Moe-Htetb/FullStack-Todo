import { NextFunction, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { authRequest } from "./authMiddleware";
import { Todos } from "../models/Todos";

const authorizeOwner = asyncHandler(
  async (req: authRequest, res: Response, next: NextFunction) => {
    const { todoId } = req.params;

    const todo = await Todos.findById(todoId);
    if (!todo) {
      res.status(403);
      throw new Error();
    }
    if (todo.userId?.toString() !== req.user?._id.toString()) {
      throw new Error("You are not a owner");
    }
    next();
  }
);

export { authorizeOwner };
