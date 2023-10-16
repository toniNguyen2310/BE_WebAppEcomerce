const Cart = require("../models/cart");
const cartService = require("../services/cartService");

const cartController = {
  //GET CART => use Populate to take detail product
  displayCart: async (req, res) => {
    console.log("req.body>> ", req);
    const idUser = req.query.userId;
    try {
      const data = await cartService.handleDisplayCart(idUser);
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
    const idProduct = req.query.productId;
    const idUser = req.body.userId;
    try {
      const data = await cartService.handleAddToCart(idUser, idProduct);
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
    const idProduct = req.query.productId;
    const idUser = req.body.userId;
    try {
      const data = await cartService.handleReduceCart(idUser, idProduct);
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
    const idProduct = req.query.productId;
    const idUser = req.body.userId;
    try {
      const data = await cartService.handleRemoveSigle(idUser, idProduct);
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

  //EDIT CART
  editCart: async (req, res) => {
    console.log("params>> ", req.params);
    console.log("body>> ", req.body);
    try {
      const idUser = req.params.id;
      const dataCart = req.body;
      const data = await cartService.updateCartService(idUser, dataCart);
      res.status(200).json({
        EC: 0,
        message: "UPDATE cart success!!!",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        EC: 1,
        message: "Something wrong when you UPDATE CART",
        error: error,
      });
    }
  },
};

module.exports = cartController;
