import { Router } from "express";
import {
  createTodos,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo";
import { protect } from "../middleware/authMiddleware";
import { authorizeOwner } from "../middleware/authorizeOwner";

const router = Router();

router.post("/create", protect, createTodos);
router.get("/todos", getTodos);
router.get("/todos/:todoId", getTodo);
router.delete("/todos/:todoId", protect, authorizeOwner, deleteTodo);
router.put("/todos/:todoId", protect, authorizeOwner, updateTodo);

export default router;
