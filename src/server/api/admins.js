/*
GET /api/admins: Retrieve a list of all admins.
GET /api/admins/:id: Retrieve a specific admin by ID.
POST /api/admins: Create a new admin.
PATCH /api/admins/:id: Update an existing admin.
DELETE /api/admins/:id: Delete an admin by ID.
*/

const { ServerError } = require("../errors");
const prisma = require("../prisma");

const router = require("express").Router();

// Retrieve all admins
router.get("/admins", async (req, res, next) => {
  try {
    const admins = await prisma.admin.findMany();
    res.json(admins);
  } catch (err) {
    next(err);
  }
});

// Retrieve a specific admin by ID
router.get("/admins/:id", async (req, res, next) => {
  try {
    const adminId = +req.params.id;
    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
      select: { id: true, username: true }, // Include other fields as needed
    });
    res.json(admin);
  } catch (err) {
    next(err);
  }
});

// Create a new admin
router.post("/admins", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Validate request body
    if (!username || !password) {
      return next(new ServerError(400, "Username and password are required."));
    }

    // Create admin
    const newAdmin = await prisma.admin.create({
      data: { username, password },
    });

    res.status(201).json(newAdmin);
  } catch (err) {
    next(err);
  }
});

// Update an existing admin
router.patch("/admins/:id", async (req, res, next) => {
  try {
    const adminId = +req.params.id;
    const { username, password } = req.body;

    // Validate request body
    if (!username || !password) {
      return next(new ServerError(400, "Username and password are required."));
    }

    // Update admin
    const updatedAdmin = await prisma.admin.update({
      where: { id: adminId },
      data: { username, password },
    });

    res.json(updatedAdmin);
  } catch (err) {
    next(err);
  }
});

// Delete an admin by ID
router.delete("/admins/:id", async (req, res, next) => {
  try {
    const adminId = +req.params.id;

    await prisma.admin.delete({ where: { id: adminId } });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
