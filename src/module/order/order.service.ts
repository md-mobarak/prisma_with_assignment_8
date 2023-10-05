import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getOrdersService = async () => {
  const result = await prisma.order.findMany({});
  return result;
};

export const ordersService = {
  getOrdersService,
};
