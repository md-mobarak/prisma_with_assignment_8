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
exports.categoryService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const categoryCreateService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.category.create({
        data,
    });
    return result;
});
const getcCategoryservice = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.category.findMany({});
    return result;
});
const getSingleCategoryService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.category.findUnique({
        where: {
            id,
        },
        // include: {
        //   books: true,
        // },
    });
    // Retrieve books associated with the category using Prisma
    const books = yield prisma.book.findMany({
        where: { genre: result.title },
    });
    return {
        result,
        books,
    };
});
const updateCategoryService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const restlt = yield ((_a = prisma === null || prisma === void 0 ? void 0 : prisma.category) === null || _a === void 0 ? void 0 : _a.update({
        where: {
            id: id,
        },
        data,
    }));
    return restlt;
});
const deleteCategoryService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.category.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.categoryService = {
    updateCategoryService,
    categoryCreateService,
    getcCategoryservice,
    getSingleCategoryService,
    deleteCategoryService,
};
