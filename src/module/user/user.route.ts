import express from "express";
import auth from "../../middlerware/auth";
import { userController } from "./user.controller";
// import * as UserController from '../controllers/user.controller';

const router = express.Router();

router.get("/users", auth, userController.userGetController);
router.get("/profile", auth, userController.userProfileGetController);
router.get("/users/:id", auth, userController.userSingleGetController);
router.patch("/users/:id", auth, userController.userUpdateController);
router.delete("/users/:id", auth, userController.deleteUserController);
router.post("/auth/signup", userController.userCreateController);
router.post("/auth/signin", userController.userLoginController);

export const userRuter = router;
