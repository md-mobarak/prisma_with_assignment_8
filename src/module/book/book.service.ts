import { Book, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createBookService = async (data: Book) => {
  const result = await prisma.book.create({
    include: {
      category: true,
    },
    data,
  });
  return result;
};
const getSingleBookService = async (id: string) => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateBookService = async (data: Book, id: string) => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data,
  });
  return result;
};
const deleteBookService = async (id: string) => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });
  return result;
};

export const bookService = {
  createBookService,
  updateBookService,
  getSingleBookService,
  deleteBookService,
};
