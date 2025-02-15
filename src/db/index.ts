import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema"; // Import your schema

// Load environment variables
import { config } from "dotenv";
config();

// Create a PostgreSQL connection pool
const pool = new Pool({
  host: "localhost",
  port: 5433, // Your PostgreSQL port (from Postgres.app)
  user: "yaskatyan", // Replace with your actual macOS username
  password: "password", // Leave empty if no password is set
  database: "taskmanagement", // Your database name
});

export const db = drizzle(pool, { schema });
