var express = require("express");
var router = express.Router();

const Todo = require("../model/todo-model");

// return all todos
router.get("/", (req, res) => {
  Todo.find()
    .then((todos) => {
      res.status(200).json({
        msg: "heres the todos",
        todos: todos,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: "err getting contacts",
        err: err,
      });
    });
});

// update a single todo
router.put("/", (req, res) => {
  console.log(req.body.todo);
  const newTodo = req.body.todo;

  Todo.updateOne({ id: newTodo.id }, newTodo)
    .then((result) => {
      console.log("in success");
      res.status(200).json({
        message: "contact updated successfully",
        result: result,
      });
    })
    .catch((error) => {
      console.log("in Error");
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

// add a new todo
router.post("/", (req, res) => {
  const todo = req.body.todo;

  if (!todo) {
    res.status(500).json({
      msg: "Please provide the todo in the body of the request",
    });
    return;
  }
  console.log(req.body.todo);

  const newTodo = new Todo({
    id: todo.id,
    title: todo.title,
    content: todo.content,
    isCompleted: todo.isCompleted,
  });

  newTodo
    .save()
    .then((createdTodo) => {
      console.log("new todo");
      console.log(createdTodo);

      res.status(200).json({
        msg: "new Todo successfully saved",
        newTodo: createdTodo,
      });
    })
    .catch((err) => {
      res.status(500).json({
        msg: "Failed to save todo",
        err: err,
      });
    });
});

// find and delete a todo
router.post("/findAndDelete", (req, res) => {
  const id = req.body.id;
  if (id == null) {
    res.status(500).json({
      msg: "Please provide the id in the body of the request",
    });
    return;
  }

  Todo.findOneAndDelete({ id: id }, {}, (err, doc) => {
    if (err) {
      res.status(500).json({
        msg: "error deleted data",
      });
      return;
    }

    res.status(200).json({
      msg: "successfully deleted",
      todoDeleted: doc,
    });
  });
});

module.exports = router;
