const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
// mongoose.set("strictQuery", false);
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    listCart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);
userSchema.plugin(uniqueValidator);
const User = mongoose.model("user", userSchema);
module.exports = User;
