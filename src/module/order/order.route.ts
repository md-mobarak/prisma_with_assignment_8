import express from "express";
import auth from "../../middlerware/auth";
import { orderController } from "./order.controller";
// import auth from "../../middlerware/auth";
// import { userController } from "./user.controller";
// import * as UserController from '../controllers/user.controller';

const router = express.Router();
router.post("/create-order", auth, orderController.orderCreateController);
router.get("/", auth, orderController.orderGetController);
router.get(
  "/:orderId",
  auth,
  orderController.OrdersforSpecificCustomersController
);

export const orderRuter = router;
