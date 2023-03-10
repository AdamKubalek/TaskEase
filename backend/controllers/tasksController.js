const Item = require("../models/Task");
const asyncHandler = require("express-async-handler");

// @desc Get all tasks 
// @route GET /tasks
const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Item.find({}).lean().exec();
  if (tasks) {
    res.json(tasks);
  }
});

// @desc Create a new task 
// @route POST /tasks
const createNewTask = asyncHandler(async (req, res) => {
  const { id, checked, itemName } = req.body;

  // Confirm data
  if (!id || typeof checked !== "boolean" || !itemName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate task 
  const duplicate = await Item.findOne({ itemName }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate task" });
  }

  // Create and store the new task 
  const task = await Item.create({ id, checked, itemName });

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
  const { id, checked } = req.body;
  console.log(req.body);

  // Confirm data
  if (!id || typeof checked !== "boolean") {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Confirm task exists to update and update it
  const task = await Item.findOne({ id }).exec();

  if (!task) {
    return res.status(400).json({ message: "Item not found" });
  }

  task.checked = checked;

  const updatedTask= await task.save();

  res.json(`'${updatedTask.checked}' updated`);
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
  const task = await Item.findOne({ id }).exec();

  if (!task) {
    return res.status(400).json({ message: "Task not found" });
  }

  const result = await task.deleteOne();

  const reply = `Item '${result.itemName}' with ID ${result.id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllTasks,
  createNewTask,
  updateTask,
  deleteTask,
};
