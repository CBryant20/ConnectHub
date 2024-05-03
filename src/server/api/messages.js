const { ServerError } = require("../errors");
const prisma = require("../prisma");

const router = require("express").Router();

// Gets all messages
router.get("/", async (req, res, next) => {
  try {
    const messages = await prisma.message.findMany();
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

// Gets all messages sent by logged in user
router.get("/sent", async (req, res, next) => {
  try {
    const senderId = +res.locals.user.id;

    const messages = await prisma.message.findMany({
      where: { senderId },
    });

    res.json(messages);
  } catch (err) {
    next(err);
  }
});

// Gets all messages sent by logged in user
router.get("/sent/:id", async (req, res, next) => {
  try {
    const messageId = +req.params.id;

    const messages = await prisma.message.findUnique({
      where: { id: messageId },
    });

    res.json(messages);
  } catch (err) {
    next(err);
  }
});

// Gets all messages sent by logged in user
router.get("/received", async (req, res, next) => {
  try {
    const recipientId = +res.locals.user.id;

    const messages = await prisma.message.findMany({
      where: { recipientId },
    });

    res.json(messages);
  } catch (err) {
    next(err);
  }
});

// Gets all messages sent by logged in user
router.get("/received/:id", async (req, res, next) => {
  try {
    const messageId = +req.params.id;

    const message = await prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.json(message);
  } catch (err) {
    next(err);
  }
});

// Creates a message from logged in user to me
router.post("/", async (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content) {
      return next(new ServerError(400, "Content is required."));
    }

    const fixedRecipientId = 21;

    const newMessage = await prisma.message.create({
      data: {
        content,
        senderId: +res.locals.user.id,
        recipientId: fixedRecipientId,
      },
    });

    res.status(201).json(newMessage);
  } catch (err) {
    next(err);
  }
});

// Updates a message sent by a logged in user
router.patch("/sent/:id", async (req, res, next) => {
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

router.delete("/sent/:id", async (req, res, next) => {
  try {
    const messageId = +req.params.id;
    const userId = res.locals.user.id;

    const message = await prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    if (message.senderId !== userId) {
      return res.status(403).json({
        error:
          "This message does not belong to you!!! You cannot delete this message.",
      });
    }

    await prisma.message.delete({ where: { id: messageId } });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
