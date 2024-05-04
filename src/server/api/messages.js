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

router.get("/me", async (req, res, next) => {
  try {
    const userId = res.locals.user.id;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const messages = await prisma.message.findMany({
      where: {
        OR: [{ senderId: userId }, { recipientId: userId }],
      },
    });

    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages for logged-in user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch message with sender information
router.get("/:id", async (req, res, next) => {
  try {
    const messageId = parseInt(req.params.id, 10);

    const message = await prisma.message.findUnique({
      where: { id: messageId },
      include: {
        sender: true,
      },
    });

    if (!message) {
      return res.status(404).json({ error: "Message not found." });
    }

    res.json(message);
  } catch (err) {
    next(err);
  }
});

// Gets all messages for the logged in user
router.get("/:userId", async (req, res, next) => {
  try {
    const userId = +res.locals.user.id;

    const messages = await prisma.message.findMany({
      where: {
        OR: [{ senderId: userId }, { recipientId: userId }],
      },
    });
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

// Gets conversation between two users, listed by date
router.get("/conversation", async (req, res, next) => {
  try {
    const userId = +res.locals.user.id;
    const fixedRecipientId = 21;
    const user2 = fixedRecipientId;

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, recipientId: user2 },
          { senderId: user2, recipientId: userId },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });
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

// Gets a message thread
router.get("/thread/:messageId", async (req, res, next) => {
  try {
    const messageId = parseInt(req.params.messageId, 10);

    const messages = await prisma.message.findMany({
      where: {
        OR: [{ id: messageId }, { replyToId: messageId }],
      },
      orderBy: { createdAt: "asc" },
    });

    if (messages.length === 0) {
      return res.status(404).json({ error: "Message not found." });
    }

    res.json(messages);
  } catch (err) {
    console.error("Error fetching message thread:", err);
    res.status(500).json({ error: "Internal Server Error" });
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

// Creates a reply to a message
router.post("/reply/:messageId", async (req, res, next) => {
  try {
    const { content } = req.body;
    const messageId = parseInt(req.params.messageId, 10);
    const senderId = res.locals.user.id;

    if (!content) {
      return next(new ServerError(400, "Content is required."));
    }

    const originalMessage = await prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!originalMessage) {
      return res.status(404).json({ error: "Original message not found" });
    }

    const newMessage = await prisma.message.create({
      data: {
        content,
        senderId,
        recipientId: originalMessage.senderId,
        replyToId: messageId,
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

    const message = await prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    await prisma.message.delete({ where: { id: messageId } });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
