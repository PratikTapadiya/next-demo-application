import { defineConfig } from "prisma/config";
import { config } from "dotenv";

config(); // load .env into process.env

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    // DIRECT_URL (port 5432, non-pooled) is required for migrations.
    // Runtime queries use DATABASE_URL (pgbouncer) passed to PrismaClient in lib/db.ts.
    url: process.env.DIRECT_URL!,
  },
});
