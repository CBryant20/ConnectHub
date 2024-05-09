const { PrismaClient } = require("@prisma/client");
const faker = require("faker");

const prisma = new PrismaClient();

const randomElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

const seed = async () => {
  try {
    const storedUserIds = [];
    const storedMessageIds = [];

    const messageStatuses = ["sent", "delivered", "read"];
    const messageTypes = ["text", "video", "image"];
    const fileTypes = ["image/png", "image/jpeg", "video/mp4"];

    for (let i = 0; i < 20; i++) {
      const randomFullName = `${faker.name.firstName()} ${faker.name.lastName()}`;
      const randomEmail = faker.internet.email();
      const randomPassword = faker.internet.password();
      const randomProfilePicture = faker.image.avatar();

      const user = await prisma.user.create({
        data: {
          fullName: randomFullName,
          email: randomEmail,
          password: randomPassword,
          profilePicture: Math.random() > 0.5 ? randomProfilePicture : null,
          isOnline: Math.random() > 0.5,
        },
      });
      storedUserIds.push(user.id);
    }

    const fixedRecipientId = storedUserIds[0];

    for (let i = 0; i < 20; i++) {
      const randomContent = faker.lorem.sentence();
      const randomSenderId =
        storedUserIds[Math.floor(Math.random() * storedUserIds.length)];

      const message = await prisma.message.create({
        data: {
          content: randomContent,
          senderId: randomSenderId,
          recipientId: fixedRecipientId,
          status: randomElement(messageStatuses),
          type: randomElement(messageTypes),
        },
      });

      storedMessageIds.push(message.id);
    }

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
          status: randomElement(messageStatuses),
          type: randomElement(messageTypes),
        },
      });
    }

    for (let i = 0; i < 10; i++) {
      const messageId =
        storedMessageIds[Math.floor(Math.random() * storedMessageIds.length)];
      const fileName = faker.system.fileName();
      const fileType = randomElement(fileTypes);
      const fileSize = faker.datatype.number({ min: 1000, max: 100000 });

      await prisma.attachment.create({
        data: {
          fileName,
          fileType,
          fileSize,
          messageId,
        },
      });
    }

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
            likedAt: new Date(),
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
