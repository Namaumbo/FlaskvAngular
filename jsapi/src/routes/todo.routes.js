const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");

router.get("/get-todo", todoController.getTodo);

router.put("/complete-todo/:id", todoController.complete);

router.put("/undo-todo/:id", todoController.undo);

router.delete("/delete-todo/:id", todoController.deleteTodo);

router.post("/add-todo", todoController.addTodo);

router.post('/search-todo', todoController.searchForAnItem)

router.post("/seed-todo", todoController.seeding)

router.get("/get-incomplete" , todoController.getIncompleteTodo)

router.get("/get-done" , todoController.getDoneTodo)
module.exports = router;
