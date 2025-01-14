const prisma = require("./index");

const seed = async () => {
  const employees = Array.from({ length: 10 }, (_, i) => ({
    name: `Employee ${i + 1}`,
  }));
  const createEmployees = async () => {
    for (const employee of employees) {
      console.log(employee);
      try {
        const newUser = await prisma.employee.createMany({
          data: { name: employee.name },
        });
        console.log(newUser);
      } catch (err) {
        console.error("couldnt add the employees", err);
      }
    }
  };
  createEmployees();
};

seed()
  // .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    // await prisma.$disconnect();
    process.exit(1);
  });
