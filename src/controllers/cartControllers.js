const Cart = require("../models/cart");
const cartService = require("../services/cartService");

const cartController = {
  //GET CART => use Populate to take detail product
  displayCart: async (req, res) => {
    const userId = req.body.userId;
    try {
      const data = await cartService.handleDisplayCart(userId);
      res.status(200).json({
        EC: 0,
        message: "Display cart success!!",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        EC: 1,
        message: "Something wrong when display cart",
        error: error,
      });
    }
  },

  //CREATE: add a product to the shopping cart when "Add to cart" button is pressed
  addToCart: async (req, res) => {
    console.log("res>>> ", req.query, req.body);
    const idProduct = req.query.id;
    const userId = req.body.userId;
    try {
      const data = await cartService.handleAddToCart(userId, idProduct);
      res.status(200).json({
        EC: 0,
        message: "Handle cart success!",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        EC: 1,
        message: "Something wrong when you handle cart",
        error: error,
      });
    }
  },

  //REDUCE: reduce one from an item in the shopping cart
  reduceToCart: async (req, res) => {
    const idProduct = req.query.id;
    const userId = req.body.userId;
    try {
      const data = await cartService.handleReduceCart(userId, idProduct);
      res.status(200).json({
        EC: 0,
        message: "Reduce cart success!!!",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        EC: 1,
        message: "Something wrong when you Reduce To Cart",
        error: error,
      });
    }
  },

  //REMOVE ALL
  removeSigle: async (req, res) => {
    const idProduct = req.query.id;
    const userId = req.body.userId;
    try {
      const data = await cartService.handleRemoveSigle(userId, idProduct);
      res.status(200).json({
        EC: 0,
        message: "delete cart success!!",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        EC: 1,
        message: "Something wrong when delete cart",
        error: error,
      });
    }
  },
};

module.exports = cartController;
