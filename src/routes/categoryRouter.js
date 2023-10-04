const express = require("express");
const categoryRouter = express.Router();
const middlewareControllers = require("../controllers/middlewareControllers");
const categoryControllers = require("../controllers/categoryController");
const productControllers = require("../controllers/productControllers");

//CREATE PRODUCT
categoryRouter.post("/", categoryControllers.createCategory);
categoryRouter.get("/", categoryControllers.fetchAllCategory);
categoryRouter.get("/discount", categoryControllers.getProductByDiscount);

module.exports = categoryRouter;
