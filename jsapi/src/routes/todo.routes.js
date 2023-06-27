const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");

router.get("/get-todo", todoController.getTodo);

router.put("/complete-todo/:id", todoController.complete);

router.put("/undo-todo/:id", todoController.undo);

router.delete("/delete-todo/:id", todoController.deleteTodo);

router.post("/add-todo", todoController.addTodo);

router.post("/seed-todo", todoController.seeding)
module.exports = router;
