const middlewareControllers = require("../controllers/middlewareControllers");
const userController = require("../controllers/userControllers");
const userRouter = require("express").Router();

//Get All Users
userRouter.get(
  "/",
  middlewareControllers.verifyToken,
  userController.getAllUsers
);

//Delete User
userRouter.delete(
  "/:id",
  middlewareControllers.verifyTokenAndAdminAuth,
  userController.deleteUser
);

module.exports = userRouter;
