const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  checked: {
    type: Boolean,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Item", itemSchema);
