const Order = require("../models/order");
const orderService = require("../services/orderService");

const orderController = {
  //CREATE ORDER
  createOder: async (req, res) => {
    console.log("req.user>>>", req.body);
    try {
      const newOrder = {
        userId: req.body.userId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        note: req.body.note,
        // status: req.body.status,
        listCart: req.body.listCart,
      };
      console.log("createOrder>>> ", newOrder);
      //   return;
      const createOrder = await Order.create(newOrder);
      console.log("createOrder>>> ", createOrder);
      res.status(200).json({
        EC: 0,
        data: createOrder,
      });
    } catch (error) {
      res.status(500).json({
        EC: 1,
        data: error,
      });
    }
  },

  //GET ORDER
  getOrderByUser: async (req, res) => {
    console.log("req.user>>>", req.params);
    try {
      const idUser = req.params.id;
      const order = await orderService.getOrderByUserService(idUser);
      res.status(200).json({
        EC: 0,
        data: order,
      });
    } catch (error) {
      res.status(500).json({
        EC: 1,
        data: error,
      });
    }
  },

  //EDIT ORDER
  editStatusOrder: async (req, res) => {
    try {
      const idOrder = req.params.id;
      console.log("idOrder>>> ", idOrder);

      const order = await orderService.editStatusOrderService(idOrder);
      res.status(200).json({
        EC: 0,
        data: order,
      });
    } catch (error) {
      res.status(500).json({
        EC: 1,
        data: error,
      });
    }
  },
};

module.exports = orderController;
