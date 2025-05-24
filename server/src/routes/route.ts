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
router.get("/getTodos", getTodos);
router.get("/getTodo/:todoId", getTodo);
router.delete("/delete/:todoId", deleteTodo);
router.put("/update/:todoId", updateTodo);

export default router;
