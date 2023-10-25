const User = require("../models/user");
const userService = require("../services/userService");

const userController = {
  //GET ALL USERS
  getAllUsers: async (req, res) => {
    console.log("req.user>>>", req.user);
    try {
      const user = await User.find({});
      res.status(200).json({
        EC: 0,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        EC: 1,
        data: error,
      });
    }
  },

  //DELETE USER
  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json({
        EC: 0,
        data: "delete successfully",
      });
    } catch (error) {
      res.status(500).json({
        EC: 1,
        data: error,
      });
    }
  },

  //ADD PRODUCT
  adjustCart: async (req, res) => {
    console.log("params>> ", req.params);
    console.log("body>> ", req.body);

    try {
      const idUser = req.params.id;
      const dataCart = req.body;
      const data = await userService.adjustCartService(idUser, dataCart);
      res.status(200).json({
        EC: 0,
        message: "addjust cart success!",
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

  //FETCH CART BY ID USER
  fetchCartByIdUser: async (req, res) => {
    console.log("req.body>> ", req.params);
    const idUser = req.params.id;
    try {
      const data = await userService.fetchCartByIdUserService(idUser);
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

  //UPDATE USER
  updateInforUser: async (req, res) => {
    console.log("params>> ", req.params);
    console.log("body>> ", req.body);

    try {
      const idUser = req.params.id;
      const dataUpdate = req.body;
      const data = await userService.updateInforUserService(idUser, dataUpdate);

      res.status(200).json({
        EC: 0,
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        EC: 1,
        data: error,
      });
    }
  },
};

module.exports = userController;
