const prisma = require("../prisma");
const { faker } = require("@faker-js/faker");

const seed = async () => {
  const storedUserIds = [];

  // Create users
  for (let i = 0; i < 20; i++) {
    const randomUserName = faker.internet.userName();
    const randomEmail = faker.internet.email();

    const user = await prisma.user.upsert({
      where: { id: i + 1 },
      update: {},
      create: {
        username: randomUserName,
        email: randomEmail,
      },
    });
    storedUserIds.push(user.id);
  }

  // Create admin
  const adminUserName = faker.internet.userName();
  const adminEmail = faker.internet.email();
  const admin = await prisma.admin.create({
    data: {
      username: adminUserName,
      email: adminEmail,
    },
  });

  // Create messages from users to admin
  for (const userId of storedUserIds) {
    const randomContent = faker.lorem.sentence();
    await prisma.message.create({
      data: {
        content: randomContent,
        senderId: userId,
        adminId: admin.id,
      },
    });
  }

  console.log("Seeding completed successfully.");
};

seed()
  .catch((err) => console.error(err))
  .finally(async () => {
    await prisma.$disconnect();
  });
