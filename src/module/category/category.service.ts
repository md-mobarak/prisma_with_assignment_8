import { Category, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const categoryCreateService = async (data: Category) => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};
const getcCategoryservice = async () => {
  const result = await prisma.category.findMany({});
  return result;
};
const getSingleCategoryService = async (id: string) => {
  const result: any = await prisma.category.findUnique({
    where: {
      id,
    },
    // include: {
    //   books: true,
    // },
  });
  // Retrieve books associated with the category using Prisma
  const books = await prisma.book.findMany({
    where: { genre: result.title },
  });
  return {
    result,
    books,
  };
};
const updateCategoryService = async (data: Category, id: string) => {
  const restlt = await prisma?.category?.update({
    where: {
      id: id,
    },
    data,
  });
  return restlt;
};
const deleteCategoryService = async (id: string) => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};
export const categoryService = {
  updateCategoryService,
  categoryCreateService,
  getcCategoryservice,
  getSingleCategoryService,
  deleteCategoryService,
};
