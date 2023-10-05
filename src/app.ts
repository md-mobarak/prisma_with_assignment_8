import cors from "cors";
import express, { Application } from "express";
import { bookRouter } from "./module/book/book.route";
import { categoryRouter } from "./module/category/category.route";
import { orderRuter } from "./module/order/order.route";
import { userRuter } from "./module/user/user.route";

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRuter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/orders/", orderRuter);
export default app;

// /api/v1/books/create-book
