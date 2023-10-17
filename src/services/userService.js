const User = require("../models/user");

const userService = {
  //ADJUST CART WHEN ADD, INCREASE, DECREASE PRODUCTS TO CART
  adjustCartService: async (idUser, dataCart) => {
    let user = await User.findById(idUser);
    console.log("user1>>> ", user);

    if (Object.keys(dataCart).length == 0) {
      console.log("RONG");
      return;
    }

    if (user) {
      console.log("user1>>> ", user);
      user.listCart = dataCart.listCart;
      let new_user = await user.save();
      console.log("new_user>> ", new_user);
      return new_user;
    }
  },

  //FETCH CART BY USER ID
  fetchCartByIdUserService: async (idUser) => {
    console.log(idUser);
    let user_cart = await User.findById(idUser).populate({
      path: "listCart",
      populate: {
        path: "productId",
        model: "product",
      },
    });
    return user_cart.listCart;
  },
};

module.exports = userService;
