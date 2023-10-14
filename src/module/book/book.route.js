"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlerware/auth"));
const book_controller_1 = require("./book.controller");
// import { categoryController } from "./category.controller";
const router = express_1.default.Router();
router.post("/create-book/", auth_1.default, book_controller_1.bookController.bookCreateController);
router.get("/", book_controller_1.bookController.getAllBooksController);
router.get("/:categoryId/category", book_controller_1.bookController.getByCategoryIdController);
router.get("/:id", book_controller_1.bookController.getSingleController);
router.patch("/:id", auth_1.default, book_controller_1.bookController.updateBookController);
router.delete("/:id", auth_1.default, book_controller_1.bookController.deleteBookController);
exports.bookRouter = router;
