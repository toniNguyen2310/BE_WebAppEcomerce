const express = require("express");
const categoryRouter = express.Router();
const middlewareControllers = require("../controllers/middlewareControllers");
const categoryControllers = require("../controllers/categoryController");

//CREATE PRODUCT
categoryRouter.post("/", categoryControllers.createCategory);
categoryRouter.get("/", categoryControllers.fetchAllCategory);

module.exports = categoryRouter;
