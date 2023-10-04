import express from "express";
import auth from "../../middlerware/auth";
import { categoryController } from "./category.controller";

const router = express.Router();

router.get("/", categoryController.categoryGetController);
router.get("/:id", categoryController.categoryGetSingleController);
router.patch("/:id", auth, categoryController.categoryUpdateController);
router.delete("/:id", auth, categoryController.categoryDeleteController);
router.post("/", auth, categoryController.categoryCreateController);
// router.post("/login", userController.userLoginController);

export const categoryRouter = router;
