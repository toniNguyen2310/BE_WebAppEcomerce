const orderRouter = require("express").Router();
const orderController = require("../controllers/orderControllers");

//CREATE ORDER
orderRouter.post("/", orderController.createOder);

//GET ORDER BY USER
orderRouter.get("/:id", orderController.getOrderByUser);

//EDIT STATUS ORDER
orderRouter.put("/edit/:id", orderController.editStatusOrder);

//GET ORDER BY PHONE
orderRouter.get("/phone/:number", orderController.getOrderByPhone);

module.exports = orderRouter;
