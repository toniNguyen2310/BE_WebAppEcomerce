const express = require("express");
const cartRouter = express.Router();
const cartController = require("../controllers/cartControllers");

//DISPLAY CART
cartRouter.get("/", cartController.displayCart);

//CREATE + ADD + INCREASE => CART
cartRouter.get("/increase", cartController.addToCart);

//REDUCE CART
cartRouter.get("/decrease", cartController.reduceToCart);

//REMOVE ALL
cartRouter.get("/removeSigle", cartController.removeSigle);

module.exports = cartRouter;
