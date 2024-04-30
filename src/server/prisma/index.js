const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
let prisma = new PrismaClient();

// Hash user password before saving to database
prisma = prisma.$extends({
  query: {
    user: {
      async create({ args, query }) {
        if (args.data.password) {
          const password = await bcrypt.hash(args.data.password, 10);
          args.data.password = password;
        }
        return query(args);
      },
      async upsert({ args, query }) {
        if (args.create.password) {
          const password = await bcrypt.hash(args.create.password, 10);
          args.create.password = password;
        }
        return query(args);
      },
    },
  },
});

module.exports = prisma;
