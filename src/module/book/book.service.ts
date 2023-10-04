import { Book, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createBookService = async (data: Book) => {
  const result = await prisma.book.create({
    data,
  });
  return result;
};

export const bookService = {
  createBookService,
};
