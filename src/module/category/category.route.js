"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlerware/auth"));
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
router.get("/", category_controller_1.categoryController.categoryGetController);
router.get("/:id", category_controller_1.categoryController.categoryGetSingleController);
router.patch("/:id", auth_1.default, category_controller_1.categoryController.categoryUpdateController);
router.delete("/:id", auth_1.default, category_controller_1.categoryController.categoryDeleteController);
router.post("/create-category", auth_1.default, category_controller_1.categoryController.categoryCreateController);
exports.categoryRouter = router;
