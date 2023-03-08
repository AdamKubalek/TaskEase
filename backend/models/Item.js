const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const itemSchema = new mongoose.Schema(
  {
    checked: {
      type: Boolean,
      required: true,
    },
    itemName: {
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

itemSchema.plugin(AutoIncrement, {
  inc_field: "id",
  id: "item_id",
  start_seq: 100,
});

module.exports = mongoose.model("Item", itemSchema);
