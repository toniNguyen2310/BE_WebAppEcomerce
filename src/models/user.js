// const { boolean } = require("joi");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      minlength: 10,
      maxlength: 50,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      minlength: 6,
      maxlength: 16,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    phone: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 11,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("user", userSchema);
module.exports = User;
