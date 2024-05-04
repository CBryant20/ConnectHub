const { PrismaClient } = require("@prisma/client");
const faker = require("faker");

const prisma = new PrismaClient();

const seed = async () => {
  try {
    const storedUserIds = [];
    const storedMessageIds = [];

    // Create Users
    for (let i = 0; i < 20; i++) {
      const randomFullName = `${faker.name.firstName()} ${faker.name.lastName()}`;
      const randomEmail = faker.internet.email();
      const randomPassword = faker.internet.password();

      const user = await prisma.user.create({
        data: {
          fullName: randomFullName,
          email: randomEmail,
          password: randomPassword,
        },
      });
      storedUserIds.push(user.id);
    }

    const fixedRecipientId = storedUserIds[0];

    // Create Messages
    for (let i = 0; i < 20; i++) {
      const randomContent = faker.lorem.sentence();
      const randomSenderId =
        storedUserIds[Math.floor(Math.random() * storedUserIds.length)];
      const message = await prisma.message.create({
        data: {
          content: randomContent,
          senderId: randomSenderId,
          recipientId: fixedRecipientId,
        },
      });

      storedMessageIds.push(message.id);
    }

    // Create Replies to Messages
    for (let i = 0; i < 10; i++) {
      const randomContent = faker.lorem.sentence();
      const replyToId =
        storedMessageIds[Math.floor(Math.random() * storedMessageIds.length)];
      const randomSenderId =
        storedUserIds[Math.floor(Math.random() * storedUserIds.length)];

      await prisma.message.create({
        data: {
          content: randomContent,
          senderId: randomSenderId,
          recipientId: fixedRecipientId,
          replyToId,
        },
      });
    }

    // Create Likes on Messages
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
