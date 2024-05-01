// routes/likeRoutes.js

const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Get all liked messages
router.get("/", async (req, res) => {
  try {
    const likedMessages = await prisma.like.findMany({
      include: {
        message: true,
        user: true,
      },
    });

    res.json(likedMessages);
  } catch (error) {
    console.error("Error retrieving liked messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Post a like to a specific message
router.post("/:messageId/like", async (req, res) => {
  const { messageId } = req.params;
  const { userId } = req.body;

  try {
    const message = await prisma.message.findUnique({
      where: { id: parseInt(messageId) },
    });
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    const user = await prisma.user.findUnique({
      where: { id: +userId },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingLike = await prisma.like.findFirst({
      where: {
        messageId: +messageId,
        userId: +userId,
      },
    });
    if (existingLike) {
      return res.status(400).json({ error: "Like already exists" });
    }

    const like = await prisma.like.create({
      data: {
        messageId: +messageId,
        userId: +userId,
      },
    });

    res.status(201).json({ message: "Like added successfully", like });
  } catch (error) {
    console.error("Error adding like:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a like from a specific message
router.delete("/:messageId/like/:userId", async (req, res) => {
  const { messageId, userId } = req.params;

  try {
    const like = await prisma.like.findFirst({
      where: {
        messageId: +messageId,
        userId: +userId,
      },
    });
    if (!like) {
      return res.status(404).json({ error: "Like not found" });
    }

    await prisma.like.delete({
      where: {
        id: like.id,
      },
    });

    res.status(204).json({ message: "Like deleted successfully" });
  } catch (error) {
    console.error("Error deleting like:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
