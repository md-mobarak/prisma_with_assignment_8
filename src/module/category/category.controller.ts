import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { categoryService } from "./category.service";

const categoryCreateController: RequestHandler = async (req: any, res: any) => {
  try {
    const isAdmin = req?.user?.role === "admin";
    if (!isAdmin) {
      return res.status(404).json({
        success: true,
        statusCode: 404,
        message: "Unauthorized access",
      });
    }
    const data = req.body;
    const result = await categoryService.categoryCreateService(data);
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "category create successfully",
      data: result,
    });
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Failed to category create",
      err: err,
    });
  }
};
const categoryGetController: RequestHandler = async (req, res) => {
  try {
    const result = await categoryService.getcCategoryservice();

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "category get successfully",
      data: result,
    });
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Failed to category get",
      err: err,
    });
  }
};
const categoryGetSingleController: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await categoryService.getSingleCategoryService(id);
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "category single get successfully",
      data: {
        id: result?.result?.id,
        title: result?.result?.title,
        books: result?.books,
      },
    });
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Failed to category get",
      err: err,
    });
  }
};
const categoryUpdateController: RequestHandler = async (req: any, res: any) => {
  try {
    const isAdmin = req?.user?.role === "admin";
    if (!isAdmin) {
      return res.status(404).json({
        success: true,
        statusCode: 404,
        message: "Unauthorized access",
      });
    }
    const id = req?.params?.id;
    const data = await req?.body;
    const result = await categoryService?.updateCategoryService(data, id);
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "category updated successfully",
      data: result,
    });
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Failed to category get",
      err: err,
    });
  }
};
const categoryDeleteController: RequestHandler = async (req: any, res: any) => {
  try {
    const isAdmin = req?.user?.role === "admin";
    if (!isAdmin) {
      return res.status(404).json({
        success: true,
        statusCode: 404,
        message: "Unauthorized access",
      });
    }
    const id = req?.params?.id;
    const result = await categoryService.deleteCategoryService(id);
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "category deleted successfully",
      data: result,
    });
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Failed to category deleted",
      err: err,
    });
  }
};
export const categoryController = {
  categoryDeleteController,
  categoryCreateController,
  categoryGetController,
  categoryGetSingleController,
  categoryUpdateController,
};
