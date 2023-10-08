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
exports.bookController = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const book_service_1 = require("./book.service");
const prisma = new client_1.PrismaClient();
const bookCreateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const isAdmin = ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.role) === "admin";
        // console.log(isAdmin, "ata req");
        if (!isAdmin) {
            res.status(404).json({
                success: true,
                statusCode: 404,
                message: "Unauthorized access",
            });
        }
        const data = yield req.body;
        const result = yield book_service_1.bookService.createBookService(data);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "book created successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            success: false,
            message: "Failed to book create",
            err: err,
        });
    }
});
const getAllBooksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, size = 10, sortBy = "id", sortOrder = "asc", minPrice, maxPrice, category, search, } = req.query;
        // Define filter conditions
        const filters = {
            AND: [],
        };
        if (minPrice) {
            filters.AND.push({ price: { gte: parseFloat(minPrice.toString()) } });
        }
        if (maxPrice) {
            filters.AND.push({ price: { lte: parseFloat(maxPrice.toString()) } });
        }
        if (category) {
            filters.AND.push({ categoryId: category });
        }
        if (search) {
            filters.AND.push({
                OR: [
                    { title: { contains: search.toString(), mode: "insensitive" } },
                    { author: { contains: search.toString(), mode: "insensitive" } },
                    { genre: { contains: search.toString(), mode: "insensitive" } },
                ],
            });
        }
        const skip = (Number(page) - 1) * Number(size);
        const total = yield prisma.book.count({
            where: filters,
        });
        const totalPage = Math.ceil(total / Number(size));
        const books = yield prisma.book.findMany({
            where: filters,
            skip,
            take: Number(size),
            orderBy: {
                [sortBy]: sortOrder,
            },
        });
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Books fetched successfully",
            meta: {
                page: Number(page),
                size: Number(size),
                total,
                totalPage,
            },
            data: books,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            success: false,
            message: "Failed to book get",
            err: err,
        });
    }
});
const getSingleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = yield req.params.id;
        const result = yield book_service_1.bookService.getSingleBookService(id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "book single get successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            success: false,
            message: "Failed to book single",
            err: err,
        });
    }
});
const updateBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const isAdmin = ((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.role) === "admin";
        // console.log(isAdmin, "ata req");
        if (!isAdmin) {
            res.status(404).json({
                success: true,
                statusCode: 404,
                message: "Unauthorized access",
            });
        }
        const id = yield req.params.id;
        const data = yield req.body;
        const result = yield book_service_1.bookService.updateBookService(data, id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "book updated successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            success: false,
            message: "Failed to book update",
            err: err,
        });
    }
});
const deleteBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const isAdmin = ((_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.role) === "admin";
        // console.log(isAdmin, "ata req");
        if (!isAdmin) {
            res.status(404).json({
                success: true,
                statusCode: 404,
                message: "Unauthorized access",
            });
        }
        const id = yield req.params.id;
        const result = yield book_service_1.bookService.getSingleBookService(id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "book single deleted successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            success: false,
            message: "Failed to book delete",
            err: err,
        });
    }
});
const getByCategoryIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.params;
        // Validate categoryId if needed
        const page = Number(req.query.page) || 1;
        const size = Number(req.query.size) || 10;
        const books = yield prisma.book.findMany({
            where: {
                categoryId,
            },
            take: size,
            skip: (page - 1) * size,
        });
        const total = yield prisma.book.count({
            where: {
                categoryId,
            },
        });
        const totalPage = Math.ceil(total / size);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Books with associated category data fetched successfully",
            meta: {
                page,
                size,
                total,
                totalPage,
            },
            data: books,
        });
    }
    catch (err) {
        console.error("Error:", err);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal Server Error",
        });
    }
});
exports.bookController = {
    bookCreateController,
    getAllBooksController,
    getSingleController,
    updateBookController,
    deleteBookController,
    getByCategoryIdController,
};
