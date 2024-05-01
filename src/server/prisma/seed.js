const { PrismaClient } = require("@prisma/client");
const faker = require("faker");

const prisma = new PrismaClient();

const seed = async () => {
  try {
    const storedUserIds = [];
    const storedMessageIds = [];

    // Create users
    for (let i = 0; i < 20; i++) {
      const randomFullName = `${faker.name.firstName()} ${faker.name.lastName()}`;
      const randomEmail = faker.internet.email();
      const randomPassword = faker.internet.password();
      const randomIsAdmin = faker.datatype.boolean();

      const user = await prisma.user.upsert({
        where: { id: i + 1 },
        update: {},
        create: {
          fullName: randomFullName,
          email: randomEmail,
          password: randomPassword,
          isAdmin: randomIsAdmin,
        },
      });
      storedUserIds.push(user.id);
    }

    // Create messages from users to admin
    for (const userId of storedUserIds) {
      const randomContent = faker.lorem.sentence();
      const message = await prisma.message.create({
        data: {
          content: randomContent,
          senderId: userId,
        },
      });
      storedMessageIds.push(message.id);
    }

    // Create likes for messages
    for (const userId of storedUserIds) {
      const messageIdToLike =
        storedMessageIds[Math.floor(Math.random() * storedMessageIds.length)];

      const existingLike = await prisma.like.findFirst({
        where: {
          userId,
          messageId: messageIdToLike,
        },
      });

      if (!existingLike) {
        await prisma.like.create({
          data: {
            userId,
            messageId: messageIdToLike,
          },
        });
      }
    }

    console.log("Seeding completed successfully.");
  } catch (err) {
    console.error("Error seeding data:", err);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
