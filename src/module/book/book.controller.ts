import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { bookService } from "./book.service";
const prisma = new PrismaClient();

const bookCreateController: RequestHandler = async (req: any, res: any) => {
  try {
    const isAdmin = req?.user?.role === "admin";
    // console.log(isAdmin, "ata req");
    if (!isAdmin) {
      res.status(404).json({
        success: true,
        statusCode: 404,
        message: "Unauthorized access",
      });
    }
    const data = await req.body;
    const result = await bookService.createBookService(data);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "book created successfully",
      data: result,
    });
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Failed to book create",
      err: err,
    });
  }
};
const getAllBooksController: RequestHandler = async (req: any, res: any) => {
  try {
    const {
      page = 1,
      size = 10,
      sortBy = "id",
      sortOrder = "asc",
      minPrice,
      maxPrice,
      category,
      search,
    } = req.query;
    // Define filter conditions
    const filters: any = {
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

    const total = await prisma.book.count({
      where: filters,
    });

    const totalPage = Math.ceil(total / Number(size));

    const books = await prisma.book.findMany({
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
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Failed to book get",
      err: err,
    });
  }
};
const getSingleController: RequestHandler = async (req: any, res: any) => {
  try {
    const id = await req.params.id;
    const result = await bookService.getSingleBookService(id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "book single get successfully",
      data: result,
    });
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Failed to book single",
      err: err,
    });
  }
};
const updateBookController: RequestHandler = async (req: any, res: any) => {
  try {
    const isAdmin = req?.user?.role === "admin";
    // console.log(isAdmin, "ata req");
    if (!isAdmin) {
      res.status(404).json({
        success: true,
        statusCode: 404,
        message: "Unauthorized access",
      });
    }
    const id = await req.params.id;
    const data = await req.body;
    const result = await bookService.updateBookService(data, id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "book updated successfully",
      data: result,
    });
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Failed to book update",
      err: err,
    });
  }
};

const deleteBookController: RequestHandler = async (req: any, res: any) => {
  try {
    const isAdmin = req?.user?.role === "admin";
    // console.log(isAdmin, "ata req");
    if (!isAdmin) {
      res.status(404).json({
        success: true,
        statusCode: 404,
        message: "Unauthorized access",
      });
    }
    const id = await req.params.id;
    const result = await bookService.getSingleBookService(id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "book single deleted successfully",
      data: result,
    });
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Failed to book delete",
      err: err,
    });
  }
};
const getByCategoryIdController: RequestHandler = async (
  req: any,
  res: any
) => {
  try {
    const { categoryId } = req.params;

    // Validate categoryId if needed

    const page = Number(req.query.page) || 1;
    const size = Number(req.query.size) || 10;

    const books = await prisma.book.findMany({
      where: {
        categoryId,
      },
      take: size,
      skip: (page - 1) * size,
    });

    const total = await prisma.book.count({
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
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};
export const bookController = {
  bookCreateController,
  getAllBooksController,
  getSingleController,
  updateBookController,
  deleteBookController,
  getByCategoryIdController,
};
