const { ServerError } = require("../../errors");
const prisma = require("../../prisma");
const jwt = require("./jwt");
const bcrypt = require("bcrypt");
const router = require("express").Router();
module.exports = router;

router.post("/register", async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      throw new ServerError(
        400,
        "Full name, email, and password are required."
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user) {
      throw new ServerError(400, `Account with email ${email} already exists.`);
    }

    const newUser = await prisma.user.create({
      data: { fullName, email, password },
    });

    const token = jwt.sign({ id: newUser.id });
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

/** Returns token for account if credentials valid */
router.post("/login", async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      throw new ServerError(400, "Full name, email and password required.");
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new ServerError(400, `Account with email ${email} does not exist.`);
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new ServerError(401, "Invalid password.");
    }

    const token = jwt.sign({ id: user.id });
    res.json({ token });
  } catch (err) {
    next(err);
  }
});
