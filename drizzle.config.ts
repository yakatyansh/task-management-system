import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config(); // Load environment variables

export default defineConfig({
  schema: "./src/db/schema.ts", // Adjust path if needed
  out: "./drizzle", // Directory for migrations
  dialect: "postgresql", // Correct dialect
  dbCredentials: {
    host: "localhost",
    port: 5433, // Ensure this matches your Postgres.app port
    user: "yashkatyan", // Replace with your macOS username
    password: "password", // Leave empty if no password is set
    database: "taskmanagement", // Replace with your actual database name
    ssl: false, // Ensure this matches your Postgres.app settings
  },
});
