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

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ServerError(400, "Email and password required.");
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

router.post("/changePassword", async (req, res, next) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new ServerError(404, "User not found.");
    }

    const passwordValid = await bcrypt.compare(currentPassword, user.password);

    if (!passwordValid) {
      throw new ServerError(401, "Current password is incorrect.");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.json({ message: "Password updated successfully." });
  } catch (error) {
    next(error);
  }
});
