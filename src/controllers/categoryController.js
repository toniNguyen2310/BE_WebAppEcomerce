const Category = require("../models/category");
const Product = require("../models/product");

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
      console.log("error>> ", error);
      res.status(500).json({
        errCode: 1,
        message: "Danh mục đã tồn tại",
        error: error,
      });
    }
  },
  //FETCH ALL
  fetchAllCategory: async (req, res) => {
    try {
      console.log("body category>> ", req.query);
      const categoryName = req.query.value;
      const category = await Category.find({ value: categoryName });
      console.log("category??>>", category);
      return res.status(200).json({
        errCode: 0,
        message: "take date category successful!!!!",
        data: category[0],
      });
    } catch (error) {
      res.status(500).json({
        errCode: 1,
        message: "have error",
        error: error,
      });
    }
  },

  //GET PRODUCT CATEGORY SALES TO DISPLAY HOMEPAGE
  getProductByDiscount: async (req, res) => {
    try {
      const products = await Product.find({ discount: { $gt: 0 } }).sort({
        discount: -1,
      });
      console.log("products>>> ", products);
      if (products.length >= 10) {
        const productSlice = products.slice(0, 10);
        console.log("slice discount");
        return res.status(200).json({
          errCode: 0,
          message: "Đã tìm thấy DS sản phẩm",
          data: productSlice,
        });
      } else {
        const productSlice = products;
        console.log("ko slice discount");
        return res.status(200).json({
          errCode: 0,
          message: "Đã tìm thấy DS sản phẩm",
          data: productSlice,
        });
      }

      // return res.status(200).json({
      //   errCode: 0,
      //   message: "Đã tìm thấy DS sản phẩm",
      //   data: products,
      // });
    } catch (error) {
      res.status(500).json({
        errCode: 1,
        message: "Không tìm thấy sản phẩm",
        error: error,
      });
    }
  },
};

module.exports = categoryControllers;
