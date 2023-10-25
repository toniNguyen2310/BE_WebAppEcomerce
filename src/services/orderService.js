const Order = require("../models/order");

const orderService = {
  //FETCH CART BY USER ID
  getOrderByUserService: async (idUser) => {
    console.log(idUser);
    let listOrder = await Order.find({ userId: idUser }).populate({
      path: "listCart",
      populate: {
        path: "productId",
        model: "product",
      },
    });
    // console.log("listOrder>> ", listOrder);
    return listOrder;
  },

  editStatusOrderService: async (idOrder) => {
    let order = await Order.findById(idOrder);
    console.log("order>>> ", order);
    if (order) {
      order.status = "Đã huỷ";
      let new_order = await order.save();
      return new_order;
    }
  },
};

module.exports = orderService;
