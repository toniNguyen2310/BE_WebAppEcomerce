const Category = require("../models/category");

const categoryControllers = {
  //CREATE
  createCategory: async (req, res) => {
    console.log("req>>>", req.body);
    try {
      const newCategory = req.body;
      const createCategory = await Category.create(newCategory);
      console.log("createCategory>>> ", createCategory);
      return res.status(200).json({
        errCode: 0,
        message: "Tạo danh mục thành công!!!",
        data: createCategory,
      });
    } catch (error) {
      res.status(500).json({
        errCode: 1,
        message: "Danh mục đã tồn tại",
        error: error.errors,
      });
    }
  },
  //FETCH ALL
  fetchAllCategory: async (req, res) => {
    try {
      const category = await Category.find({}).populate("product");
      console.log("category>>", category);
      return res.status(200).json({
        errCode: 0,
        message: "take date category successful!!!!",
        data: category,
      });
    } catch (error) {
      res.status(500).json({
        errCode: 1,
        message: "have error",
        error: error,
      });
    }
  },
};

module.exports = categoryControllers;
