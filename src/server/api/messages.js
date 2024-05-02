/*
GET /api/messages: Retrieve a list of all messages.
GET /api/messages/:id: Retrieve a specific message by ID.
POST /api/messages: Create a new message.
PATCH /api/messages/:id: Update an existing message.
DELETE /api/messages/:id: Delete a message by ID.
*/

// messagesRouter.js

const { ServerError } = require("../errors");
const prisma = require("../prisma");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const messages = await prisma.message.findMany();
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const userId = +req.params.userId;

    const messages = await prisma.message.findMany({
      where: { senderId: userId },
    });

    res.json(messages);
  } catch (err) {
    next(err);
  }
});

router.post("/:userId", async (req, res, next) => {
  try {
    const { content } = req.body;
    const { userId } = req.params;

    if (!content || !userId) {
      return next(new ServerError(400, "Content and userId are required."));
    }

    const userIdInt = parseInt(userId, 10);

    if (isNaN(userIdInt)) {
      return next(new ServerError(400, "userId must be a valid integer."));
    }

    // Assuming senderId refers to the authenticated user sending the message
    const senderId = req.user.id; // Assuming you have user information stored in req.user

    const newMessage = await prisma.message.create({
      data: { content, senderId, userId: userIdInt }, // Assuming senderId refers to the sender
    });

    res.status(201).json(newMessage);
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const messageId = +req.params.id;
    const { content } = req.body;
    if (!content) {
      return next(new ServerError(400, "Content is required."));
    }
    const updatedMessage = await prisma.message.update({
      where: { id: messageId },
      data: { content },
    });
    res.json(updatedMessage);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const messageId = +req.params.id;
    await prisma.message.delete({ where: { id: messageId } });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
