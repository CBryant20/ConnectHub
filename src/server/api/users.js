const { ServerError } = require("../errors");
const prisma = require("../prisma");
const bcrypt = require("bcrypt");

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
      select: { id: true, firstName: true, lastName: true, email: true },
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = +res.locals.user.id;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, firstName: true, lastName: true, email: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const id = +res.locals.user.id;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password === undefined) {
      return next(
        new ServerError(
          400,
          "First name, last name, email, and password are required."
        )
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { firstName, lastName, email, password: hashedPassword },
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
