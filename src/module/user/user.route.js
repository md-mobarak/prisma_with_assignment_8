"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRuter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlerware/auth"));
const user_controller_1 = require("./user.controller");
// import * as UserController from '../controllers/user.controller';
const router = express_1.default.Router();
router.get("/users", auth_1.default, user_controller_1.userController.userGetController);
router.get("/profile", auth_1.default, user_controller_1.userController.userProfileGetController);
router.get("/users/:id", auth_1.default, user_controller_1.userController.userSingleGetController);
router.patch("/users/:id", auth_1.default, user_controller_1.userController.userUpdateController);
router.delete("/users/:id", auth_1.default, user_controller_1.userController.deleteUserController);
router.post("/auth/signup", user_controller_1.userController.userCreateController);
router.post("/auth/signin", user_controller_1.userController.userLoginController);
exports.userRuter = router;
