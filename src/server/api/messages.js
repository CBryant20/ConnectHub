/*
GET /api/messages: Retrieve a list of all messages.
GET /api/messages/:id: Retrieve a specific message by ID.
POST /api/messages: Create a new message.
PATCH /api/messages/:id: Update an existing message.
DELETE /api/messages/:id: Delete a message by ID.
*/

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

router.get("/:id", async (req, res, next) => {
  try {
    const messageId = +req.params.id;
    const message = await prisma.message.findUnique({
      where: { id: messageId },
    });
    res.json(message);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { content, senderId } = req.body;
    if (!content || !senderId) {
      return next(new ServerError(400, "Content and senderId are required."));
    }
    const senderIdInt = parseInt(senderId, 10);

    if (isNaN(senderIdInt)) {
      return next(new ServerError(400, "senderId must be a valid integer."));
    }
    const newMessage = await prisma.message.create({
      data: { content, senderId: senderIdInt },
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