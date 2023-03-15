const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    taskDesc: {
      type: String,
      required: true,
    }
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
