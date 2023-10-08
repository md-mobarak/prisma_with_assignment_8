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
exports.categoryController = void 0;
const http_status_codes_1 = require("http-status-codes");
const category_service_1 = require("./category.service");
const categoryCreateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const data = req.body;
        const result = yield category_service_1.categoryService.categoryCreateService(data);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "category create successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            success: false,
            message: "Failed to category create",
            err: err,
        });
    }
});
const categoryGetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield category_service_1.categoryService.getcCategoryservice();
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "category get successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            success: false,
            message: "Failed to category get",
            err: err,
        });
    }
});
const categoryGetSingleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const id = req.params.id;
        const result = yield category_service_1.categoryService.getSingleCategoryService(id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "category single get successfully",
            data: {
                id: (_b = result === null || result === void 0 ? void 0 : result.result) === null || _b === void 0 ? void 0 : _b.id,
                title: (_c = result === null || result === void 0 ? void 0 : result.result) === null || _c === void 0 ? void 0 : _c.title,
                books: result === null || result === void 0 ? void 0 : result.books,
            },
        });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            success: false,
            message: "Failed to category get",
            err: err,
        });
    }
});
const categoryUpdateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const id = (_d = req === null || req === void 0 ? void 0 : req.params) === null || _d === void 0 ? void 0 : _d.id;
        const data = yield (req === null || req === void 0 ? void 0 : req.body);
        const result = yield (category_service_1.categoryService === null || category_service_1.categoryService === void 0 ? void 0 : category_service_1.categoryService.updateCategoryService(data, id));
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "category updated successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            success: false,
            message: "Failed to category get",
            err: err,
        });
    }
});
const categoryDeleteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const id = (_e = req === null || req === void 0 ? void 0 : req.params) === null || _e === void 0 ? void 0 : _e.id;
        const result = yield category_service_1.categoryService.deleteCategoryService(id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "category deleted successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            success: false,
            message: "Failed to category deleted",
            err: err,
        });
    }
});
exports.categoryController = {
    categoryDeleteController,
    categoryCreateController,
    categoryGetController,
    categoryGetSingleController,
    categoryUpdateController,
};
