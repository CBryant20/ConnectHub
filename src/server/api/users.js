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
    const id = +res.locals.user.id;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, fullName: true, email: true },
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
    const userId = +req.params.id;
    const { fullName, email, password, isAdmin } = req.body;
    if (!fullName || !email || !password || isAdmin === undefined) {
      return next(
        new ServerError(
          400,
          "Full name, email, password, and isAdmin are required."
        )
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
