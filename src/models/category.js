const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
mongoose.set("strictQuery", false);

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    value: { type: String, require: true, unique: true },
    // description: { type: String, require: true },
    // image: { type: String, require: true },
    brand: [{ type: String }],
  },
  { timestamps: true }
);

// categorySchema.plugin(uniqueValidator);
const Category = mongoose.model("category", categorySchema);
module.exports = Category;
