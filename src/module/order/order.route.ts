import express from "express";
import auth from "../../middlerware/auth";
import { orderController } from "./order.controller";
const router = express.Router();

router.post("/create-order/",auth, orderController.orderCreateController);
router.get("/", auth, orderController.orderGetController);
router.get(
  "/:orderId",
  auth,
  orderController.OrdersforSpecificCustomersController
);

export const orderRuter = router;
