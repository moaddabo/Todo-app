import express from "express";
const router = express.Router();
import {
  getALLTodos,
  Addtodo,
  getTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/TodoControllers.js";

router.post("/todos", Addtodo);
router.get("/todos", getALLTodos);
router.put("/todos/:id", updateTodo);
router.get("/todos/:id", getTodo);
router.delete("/todos/:id", deleteTodo);

export default router;
