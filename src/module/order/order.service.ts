import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getOrdersService = async () => {
  const result = await prisma.order.findMany({});
  return result;
};

const OrdersforSpecificCustomersService = async (userId: string) => {
  const orders = await prisma.order.findMany({
    where: {
      userId,
    },
  });
  return orders;
};

const userSingleOrderService = async (orderId: string) => {
  // Fetch the order and its associated user
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { user: true },
  });
  return order;
};


export const ordersService = {
  getOrdersService,
  OrdersforSpecificCustomersService,
  userSingleOrderService,
};
