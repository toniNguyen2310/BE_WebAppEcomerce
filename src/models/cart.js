const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const cartSchema = new mongoose.Schema(
  {
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    total: { type: Number, default: 0 },
  },
  { timestamps: true }
);

cartSchema.plugin(uniqueValidator);
const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;
