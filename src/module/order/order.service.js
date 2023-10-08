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
exports.ordersService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getOrdersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.order.findMany({});
    return result;
});
const OrdersforSpecificCustomersService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield prisma.order.findMany({
        where: {
            userId,
        },
    });
    return orders;
});
const userSingleOrderService = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch the order and its associated user
    const order = yield prisma.order.findUnique({
        where: { id: orderId },
        include: { user: true },
    });
    return order;
});
exports.ordersService = {
    getOrdersService,
    OrdersforSpecificCustomersService,
    userSingleOrderService,
};
