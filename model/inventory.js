const mongoose = require("mongoose");
const PRODUCT = require("./product");
const RECORD = require("./record");
const BRANCH = require("./branchData");

const InventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  notes: String,
  category: {
    type: [String],
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    validate: {
      validator: function(value) {
        return value >= 0;
      },
      message: 'Quantity must be a non-negative number'
    }
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: BRANCH,
    required: true,
  },
  record: {
    type: mongoose.Schema.Types.ObjectId,
    ref: RECORD,
    required: true,
  },
  Timestamp: true,
});

const Inventory = mongoose.model("Inventory", InventorySchema);

module.exports = Inventory;
