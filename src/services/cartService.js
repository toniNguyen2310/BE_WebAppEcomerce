const Cart = require("../models/cart");
const Product = require("../models/product");

const cartService = {
  //DISPLAY CART
  handleDisplayCart: async (idUser) => {
    console.log("userId>> ", idUser);
    let user_cart = await Cart.findOne({ userId: idUser }).populate({
      path: "listCart",
      populate: {
        path: "productId",
        model: "product",
      },
    });

    console.log("user_cart>> ", user_cart);
    return user_cart;
  },

  //ADD TO CART
  handleAddToCart: async (idUser, idProduct) => {
    let user_cart;
    let cart;
    //Find cart with userID, not found => create
    user_cart = await Cart.findOne({ userId: idUser });
    if (user_cart) {
      cart = user_cart;
    } else {
      cart = new Cart({});
    }

    //INVENTORY

    let itemIndex = cart.listCart.findIndex((e) => {
      console.log("e.productId>> ", e.productId.toString(), idProduct);
      return e.productId.toString() === idProduct;
    });

    if (itemIndex > -1) {
      //if product exists in the cart, update the quantity

      cart.listCart[itemIndex].quantity++;

      //decrease inventory of product when increase success
    } else {
      cart.listCart.push({
        productId: idProduct,
        quantity: 1,
      });

      //decrease inventory of product when increase success
    }

    //if the user is authenticated, store the user's id and save cart to the db

    cart.userId = idUser;
    console.log("cart>>> ", cart);
    let data = await cart.save();
    return data;
  },

  //REDUCE TO CART
  handleReduceCart: async (idUser, idProduct) => {
    let cart = await Cart.findOne({ userId: idUser });

    const itemIndex = cart.listCart.findIndex((e) => {
      console.log("e.productId>> ", e.productId.toString(), idProduct);
      return e.productId.toString() === idProduct;
    });
    if (itemIndex > -1) {
      cart.listCart[itemIndex].quantity--;

      //increase inventory of product when decrease success

      // if the item's qty reaches 0, remove it from the cart
      if (cart.listCart[itemIndex].quantity <= 0) {
        await cart.listCart.remove({ _id: cart.listCart[itemIndex]._id });
      }

      //Save the cart
      let data = await cart.save();

      //Delete cart if total product =0
      // if (cart.totalQty <= 0) {
      //   await Cart.findByIdAndRemove(cart._id);
      // }

      return data;
    } else {
      return;
    }
  },

  //REMOVE ALL
  handleRemoveSigle: async (idUser, idProduct) => {
    let cart = await Cart.findOne({ userId: idUser });

    //find the item with idProduct
    let itemIndex = cart.listCart.findIndex((e) => {
      console.log("e.productId>> ", e.productId.toString(), idProduct);
      return e.productId.toString() === idProduct;
    });

    if (itemIndex > -1) {
      //CART
      await cart.listCart.remove({ _id: cart.listCart[itemIndex]._id });
      let data = await cart.save();

      return data;
    } else {
      return;
    }
  },

  //EDITCART
  updateCartService: async (idUser, dataCart) => {
    let cart = await Cart.findOne({ userId: idUser });
    if (dataCart.listCart.length === 0) {
      await Cart.findByIdAndRemove(cart._id);
      return cart;
    } else {
      cart.listCart = dataCart.listCart;
      let new_data = await cart.save();
      return new_data;
    }
  },
};

module.exports = cartService;
544;
