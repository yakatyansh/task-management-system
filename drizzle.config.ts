import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config(); // Load environment variables

export default defineConfig({
  schema: "./src/db/schema.ts", 
  out: "./drizzle", 
  dialect: "postgresql", 
  dbCredentials: {
    host: "localhost",
    port: 5433, 
    user: "yashkatyan",
    password: "password", 
    database: "taskmanagement", 
    ssl: false, 
  },
});
