const express = require("express");
const productRouter = express.Router();
const middlewareControllers = require("../controllers/middlewareControllers");
const productControllers = require("../controllers/productControllers");

//CREATE PRODUCT
productRouter.post("/", productControllers.createProduct);

//GET PRODUCT BY ID
productRouter.get("/:id", productControllers.getProductById);

//GET PRODUCT BY CATEGORY
productRouter.get(
  "/category/:category_name",
  productControllers.getProductByCategoryName
);

//GET PRODUCT BY CATEGORY SLICE 10
productRouter.get(
  "/category-slice/:category_name",
  productControllers.getProductByCateSlice
);

//GET PRODUCT BY SALE

//GET ALL PRODUCTS PAGINATION
productRouter.get("/", productControllers.getAllProducts);

//EDIT PRODUCT BY ID
productRouter.put("/:id", productControllers.editProductById);

//DELETE PRODUCT BY ID
productRouter.delete(
  "/:id",
  middlewareControllers.verifyTokenAndAuthorization,
  productControllers.deleteProductById
);

module.exports = productRouter;
