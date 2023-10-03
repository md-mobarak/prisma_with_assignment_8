import app from "./app";

const port = process.env.PORT || 5000;
// const prisma = new PrismaClient();
async function main() {
  app.listen(port, () => {
    console.log(`assignment_8_with_prisma, running port ${port}`);
  });
}
main();
