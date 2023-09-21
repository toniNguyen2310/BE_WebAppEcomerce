const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const orderSchema = new mongoose.Schema(
  {
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    address: { type: String, required: true },
    status: { type: String, required: true },
    payment: { type: String, required: true },
  },
  { timestamps: true }
);

orderSchema.plugin(uniqueValidator);
const Order = mongoose.model("order", orderSchema);
module.exports = Order;
