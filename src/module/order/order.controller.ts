import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ordersService } from "./order.service";
const prisma = new PrismaClient();
const orderCreateController: RequestHandler = async (req: any, res: any) => {
  try {
    const isCustomer = (await req?.user?.role) === "customer";
    // console.log(isCustomer);s
    if (!isCustomer) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Only access customer",
      });
    }
    const { orderedBooks } = await req.body;
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
    return res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Order created successfully",
      data: order,
    });
  } catch (err: any) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Internal Server Error",
      err: console.log(err?.message),
    });
  }
};
const orderGetController: RequestHandler = async (req: any, res: any) => {
  try {
    const isAdmin = (await req?.user?.role) === "admin";
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
      err: console.log(err),
    });
  }
};
const OrdersforSpecificCustomersController: RequestHandler = async (
  req: any,
  res: any
) => {
  try {
    const { role, userId } = await req.user;
    if (role !== "customer") {
      return res.status(403).json({
        success: false,
        statusCode: 403,
        message: "Only customers can retrieve their own orders",
      });
    }

    const result = await ordersService.OrdersforSpecificCustomersService(
      userId
    );
    res.json({
      success: true,
      statusCode: 200,
      message: "Orders retrieved successfully",
      data: result,
    });
  } catch (error) {
    // console.error("Error:", error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

const userSingleOrderController: RequestHandler = async (
  req: any,
  res: any
) => {
  try {
    const { orderId } = req.params;
    const userRole = (req.user as { role: string }).role;
    const userId = (req.user as { userId: string }).userId;

    const result = await ordersService.userSingleOrderService(orderId);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    if (userRole === "admin" || result.user.id === userId) {
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Order fetched successfully",
        data: result,
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
  } catch (error) {
    // console.error("Error fetching order:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const orderController = {
  orderCreateController,
  OrdersforSpecificCustomersController,
  orderGetController,
  userSingleOrderController,
};
