const Task = require("../models/Task");
const asyncHandler = require("express-async-handler");

// @desc Get all tasks 
// @route GET /tasks
const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({}).lean().exec();
  if (tasks) {
    res.json(tasks);
  }
});

// @desc Create a new task 
// @route POST /tasks
const createNewTask = asyncHandler(async (req, res) => {
  const { id, completed, taskDesc } = req.body;

  // Confirm data
  if (!id || typeof completed !== "boolean" || !taskDesc) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate task 
  const duplicate = await Task.findOne({ taskDesc }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate task" });
  }

  // Create and store the new task 
  const task = await Task.create({ id, completed, taskDesc });

  if (task) {
    // Created
    return res.status(201).json({ message: "New task created" });
  } else {
    return res.status(400).json({ message: "Invalid task data received" });
  }
});

// @desc Update a task 
// @route PATCH /tasks
const updateTask = asyncHandler(async (req, res) => {
  const { id, completed } = req.body;
  console.log(req.body);

  // Confirm data
  if (!id || typeof completed !== "boolean") {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Confirm task exists to update and update it
  const task = await Task.findOne({ id }).exec();

  if (!task) {
    return res.status(400).json({ message: "Task not found" });
  }

  task.completed = completed;

  const updatedTask= await task.save();

  res.json(`'${updatedTask.completed}' updated`);
});

// @desc Delete a task 
// @route DELETE /tasks
const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Task ID required" });
  }

  // Confirm task exists to delete
  const task = await Task.findOne({ id }).exec();

  if (!task) {
    return res.status(400).json({ message: "Task not found" });
  }

  const result = await task.deleteOne();

  const reply = `Task '${result.taskDesc}' with ID ${result.id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllTasks,
  createNewTask,
  updateTask,
  deleteTask,
};
