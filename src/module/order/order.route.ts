import express from "express";
import auth from "../../middlerware/auth";
import { orderController } from "./order.controller";
// import auth from "../../middlerware/auth";
// import { userController } from "./user.controller";
// import * as UserController from '../controllers/user.controller';

const router = express.Router();

router.get("/", auth, orderController.orderGetController);
// router.get("/:id", auth, userController.userSingleGetController);
// router.patch("/:id", auth, userController.userUpdateController);
// router.delete("/:id", auth, userController.deleteUserController);
// router.post("/signup", userController.userCreateController);
router.post("/create-order", auth, orderController.orderCreateController);

export const orderRuter = router;
