const middlewareControllers = require("../controllers/middlewareControllers");
const userController = require("../controllers/userControllers");
const userRouter = require("express").Router();

//Get All Users
userRouter.get(
  "/",
  middlewareControllers.verifyTokenAndAdmin,
  userController.getAllUsers
);

//Delete User
userRouter.delete(
  "/:id",
  middlewareControllers.verifyTokenAndAuthorization,
  userController.deleteUser
);

//Add product to cart
userRouter.post("/add/:id", userController.adjustCart);

//FETCH CART FROM ID
userRouter.get("/cart/:id", userController.fetchCartByIdUser);

//PUT PRODUCT
userRouter.put("/:id", userController.updateInforUser);

module.exports = userRouter;
