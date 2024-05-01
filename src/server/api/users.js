/*
GET /api/users: Retrieve a list of all users.
GET /api/users/:id: Retrieve a specific user by ID.
PATCH /api/users/:id: Update an existing user.
DELETE /api/users/:id: Delete a user by ID.
*/

const { ServerError } = require("../errors");
const prisma = require("../prisma");

const router = require("express").Router();

router.use((req, res, next) => {
  if (!res.locals.user) {
    return next(new ServerError(401, "You must be logged in."));
  }
  next();
});

router.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, fullName: true, email: true },
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, fullName: true, email: true },
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const userId = +req.params.id;
    const { fullName, email, password, isAdmin } = req.body;
    if (!fullName || !email || !password || !isAdmin) {
      return next(
        new ServerError(400, "Full name, email, and password are required.")
      );
    }
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { fullName, email, password, isAdmin },
    });
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const userId = +req.params.id;
    await prisma.user.delete({ where: { id: userId } });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;