import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ordersService } from "./order.service";
const prisma = new PrismaClient();
const orderCreateController: RequestHandler = async (req: any, res: any) => {
  try {
    console.log(req.user.role);

    const isCustomer = req?.user?.role === "customer";
    if (!isCustomer) {
      res.status(404).json({
        success: true,
        statusCode: 404,
        message: "Unauthorized access",
      });
    }
    const { orderedBooks } = req.body;
    const order = await prisma.order.create({
      data: {
        userId: req.user.userId,
        orderedBooks: {
          createMany: {
            data: orderedBooks,
          },
        },
      },
      include: {
        orderedBooks: true,
      },
    });

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Order created successfully",
      data: order,
    });
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Internal Server Error",
      err: err,
    });
  }
};

const orderGetController: RequestHandler = async (req: any, res: any) => {
  try {
    console.log(req.user);

    const isAdmin = req?.user?.role === "admin";
    if (!isAdmin) {
      res.status(404).json({
        success: true,
        statusCode: 404,
        message: "Unauthorized access",
      });
    }
    const orders = await ordersService.getOrdersService();
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Order get successfully",
      data: orders,
    });
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Internal Server Error",
      err: err,
    });
  }
};

export const orderController = {
  orderCreateController,
  orderGetController,
};
