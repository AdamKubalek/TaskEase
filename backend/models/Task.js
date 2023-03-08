const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const taskSchema = new mongoose.Schema(
  {
    completed: {
      type: Boolean,
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.plugin(AutoIncrement, {
  inc_field: "id",
  id: "task_id",
  start_seq: 100,
});

module.exports = mongoose.model("Task", taskSchema);
