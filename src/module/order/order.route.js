"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRuter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlerware/auth"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
router.post("/create-order/", auth_1.default, order_controller_1.orderController.orderCreateController);
router.get("/", auth_1.default, order_controller_1.orderController.orderGetController);
router.get("/:orderId", auth_1.default, order_controller_1.orderController.OrdersforSpecificCustomersController);
exports.orderRuter = router;
