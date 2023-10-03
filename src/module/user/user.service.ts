import { PrismaClient } from ".prisma/client";
import { User } from "@prisma/client";
const prisma = new PrismaClient();
const userCreateService = async (data: User) => {
  const result = await prisma.user.create({
    data,
    include: {
      orders: true,
      reviewsAndRatings: true,
    },
  });
  return result;
};
const userLoginService = async (email: string) => {
  const result = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return result;
};
const allUserGetService = async () => {
  const result = await prisma.user.findMany({});
  return result;
};
const singleUserGet = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

const userProfileUpdate = async (data: any, id: string) => {
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data,
  });
  return result;
};
const userDeleteService = async (id: string) => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const userService = {
  userLoginService,
  userCreateService,
  allUserGetService,
  singleUserGet,
  userProfileUpdate,
  userDeleteService,
};
