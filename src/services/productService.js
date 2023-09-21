const Product = require("../models/product");
const productService = {
  getProductByCategoryService: async (limit, page, categoryName) => {
    // console.log("queryString>>> ", queryString);
    let offset = (page - 1) * limit;
    // const { filter, skip } = aqp(queryString);
    // console.log("filter>>> ", filter, "skip>>> ", skip);
    // delete filter.page;
    const products = await Product.find({ category: categoryName })
      .skip(offset)
      .limit(limit)
      .exec();
    return products;
  },

  //GET ALL PRODUCTS
  getAllProductsService: async (limit, page, name, category, brand) => {
    let offset = (page - 1) * limit;

    const products = await Product.find({
      $and: [name, category, brand],
      // $or: [{ name: name }, { category: category }],
    })
      .skip(offset)
      .limit(limit)
      .exec();
    console.log("products>>> ", products);
    const count = await Product.find({ $and: [name, category, brand] }).count();
    console.log("count>> ", count);
    return { products, count };
  },
};
module.exports = productService;
