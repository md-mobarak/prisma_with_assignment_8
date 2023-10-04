import express from "express";
import auth from "../../middlerware/auth";
import { bookController } from "./book.controller";
// import { categoryController } from "./category.controller";

const router = express.Router();
router.post("/create-book/", auth, bookController.bookCreateController);
router.get("/", bookController.getAllBooksController);
router.get("/:categoryId", bookController.getByCategoryIdController);
router.get("/:id", bookController.getSingleController);
router.patch("/:id", auth, bookController.updateBookController);
router.delete("/:id", auth, bookController.deleteBookController);

export const bookRouter = router;
