import { Router } from "express";
import {
  createTodos,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo";

const router = Router();

router.post("/create", createTodos);
router.get("/todos", getTodos);
router.get("/todos/:todoId", getTodo);
router.delete("/todos/:todoId", deleteTodo);
router.put("/todos/:todoId", updateTodo);

export default router;
