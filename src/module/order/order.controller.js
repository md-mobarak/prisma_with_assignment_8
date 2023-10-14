"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const order_service_1 = require("./order.service");
const prisma = new client_1.PrismaClient();
const orderCreateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const isCustomer = (yield ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.role)) === "customer";
        // console.log(isCustomer);s
        if (!isCustomer) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Only access customer",
            });
        }
        const { orderedBooks } = yield req.body;
        const order = yield prisma.order.create({
            data: {
                userId: req.user.userId,
                orderedBooks: {
                    createMany: {
                        data: orderedBooks,
                    },
                },
            },
            include: {
                orderedBooks: true,
            },
        });
        return res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Order created successfully",
            data: order,
        });
    }
    catch (err) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            success: false,
            message: "Internal Server Error",
            err: console.log(err === null || err === void 0 ? void 0 : err.message),
        });
    }
});
const orderGetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const isAdmin = (yield ((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.role)) === "admin";
        if (!isAdmin) {
            res.status(404).json({
                success: true,
                statusCode: 404,
                message: "Unauthorized access",
            });
        }
        const orders = yield order_service_1.ordersService.getOrdersService();
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Order get successfully",
            data: orders,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            success: false,
            message: "Internal Server Error",
            err: console.log(err),
        });
    }
});
const OrdersforSpecificCustomersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role, userId } = yield req.user;
        if (role !== "customer") {
            return res.status(403).json({
                success: false,
                statusCode: 403,
                message: "Only customers can retrieve their own orders",
            });
        }
        const result = yield order_service_1.ordersService.OrdersforSpecificCustomersService(userId);
        res.json({
            success: true,
            statusCode: 200,
            message: "Orders retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        // console.error("Error:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal Server Error",
        });
    }
});
const userSingleOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const userRole = req.user.role;
        const userId = req.user.userId;
        const result = yield order_service_1.ordersService.userSingleOrderService(orderId);
        if (!result) {
            return res
                .status(404)
                .json({ success: false, message: "Order not found" });
        }
        if (userRole === "admin" || result.user.id === userId) {
            return res.status(200).json({
                success: true,
                statusCode: 200,
                message: "Order fetched successfully",
                data: result,
            });
        }
        else {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }
    }
    catch (error) {
        // console.error("Error fetching order:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
});
exports.orderController = {
    orderCreateController,
    OrdersforSpecificCustomersController,
    orderGetController,
    userSingleOrderController,
};
