const Item = require("../models/Item");
const asyncHandler = require("express-async-handler");

// @desc Get all items
// @route GET /items
const getAllItems = asyncHandler(async (req, res) => {
  const items = await Item.find({}).lean().exec();
  if (items) {
    res.json(items);
  }
});

// @desc Create a new items
// @route POST /items
const createNewItem = asyncHandler(async (req, res) => {
  const { id, checked, itemName } = req.body;

  // Confirm data
  if (!id || typeof checked !== "boolean" || !itemName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate item
  const duplicate = await Item.findOne({ itemName }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate item" });
  }

  // Create and store the new item
  const item = await Item.create({ id, checked, itemName });

  if (item) {
    // Created
    return res.status(201).json({ message: "New item created" });
  } else {
    return res.status(400).json({ message: "Invalid item data received" });
  }
});

// @desc Update a item
// @route PATCH /items
const updateItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { checked } = req.body;

  // Confirm data
  if (!id || typeof checked !== "boolean") {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Confirm item exists to update
  const item = await Item.findById(id).exec();

  if (!item) {
    return res.status(400).json({ message: "Item not found" });
  }

  item.checked = checked;

  const updatedItem = await item.save();

  res.json(`'${updatedItem.checked}' updated`);
});

// @desc Delete a item
// @route DELETE /items
const deleteItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Item ID required" });
  }

  // Confirm item exists to delete
  const item = await Item.findById(id).exec();

  if (!item) {
    return res.status(400).json({ message: "Item not found" });
  }

  const result = await item.deleteOne();

  const reply = `Item '${result.itemName}' with ID ${result.id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllItems,
  createNewItem,
  updateItem,
  deleteItem,
};
