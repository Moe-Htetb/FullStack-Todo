import { Request, Response } from "express";
import { Todos } from "../models/Todos";

export const createTodos = async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    const newTodo = await Todos.create({ title });

    res.status(200).json({ message: "New Todo Added", todo: newTodo });
  } catch (error) {
    console.log("createTodos controller error" + error);
  }
};

export const getTodos = async (req: Request, res: Response) => {
  const newTodo = await Todos.find();
  try {
    res.status(200).json({ message: "All todos fetched", todo: newTodo });
  } catch (error) {
    console.log("getTodos controller error" + error);
  }
};

export const getTodo = async (req: Request, res: Response) => {
  const { todoId } = req.params;
  try {
    const newTodo = await Todos.findById(todoId);

    res.status(200).json({ message: " todo fetched", todo: newTodo });
  } catch (error) {
    console.log("getTodo controller error" + error);
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { todoId } = req.params;
  const { title } = req.body;

  try {
    const updatedTodo = await Todos.findByIdAndUpdate(todoId, { title });

    res
      .status(200)
      .json({ message: " todo has been updated", todo: updatedTodo });
  } catch (error) {
    console.log("getTodo controller error" + error);
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { todoId } = req.params;
  try {
    await Todos.findByIdAndDelete(todoId);
    res.status(200).json({ message: "Todo has been deleted." });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "Something went wrong." });
  }
};
