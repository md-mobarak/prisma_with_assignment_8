"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const book_route_1 = require("./module/book/book.route");
const category_route_1 = require("./module/category/category.route");
const order_route_1 = require("./module/order/order.route");
const user_route_1 = require("./module/user/user.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
// 1/categories/create-category
app.use("/api/v1/", user_route_1.userRuter);
app.use("/api/v1/categories/", category_route_1.categoryRouter);
app.use("/api/v1/books/", book_route_1.bookRouter);
app.use("/api/v1/orders/", order_route_1.orderRuter);
exports.default = app;
