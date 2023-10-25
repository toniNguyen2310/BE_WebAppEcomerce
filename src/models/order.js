const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    note: { type: String },
    status: { type: String, required: true, default: "Chờ xác nhận" },
    listCart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

// orderSchema.plugin(uniqueValidator);
const Order = mongoose.model("order", orderSchema);
module.exports = Order;
