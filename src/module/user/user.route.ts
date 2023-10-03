import express from "express";
import auth from "../../middlerware/auth";
import { userController } from "./user.controller";
// import * as UserController from '../controllers/user.controller';

const router = express.Router();

router.get("/", auth, userController.userGetController);
router.get("/:id", auth, userController.userSingleGetController);
router.patch("/:id", auth, userController.userUpdateController);
router.post("/signup", userController.userCreateController);
router.post("/login", userController.userLoginController);

export const userRuter = router;
