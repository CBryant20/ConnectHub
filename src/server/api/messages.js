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

router.get("/user/:userId", async (req, res, next) => {
  try {
    const messages = await prisma.message.findMany({
      where: { userId: +res.locals.user.id },
    });

    res.json(messages);
  } catch (err) {
    next(err);
  }
});

router.post("/:userId", async (req, res, next) => {
  try {
    const { content } = req.body;
    const userId = +req.params.userId;

    if (!content) {
      return next(new ServerError(400, "Content is required."));
    }

    const newMessage = await prisma.message.create({
      data: { content, user: { connect: { id: userId } } },
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
