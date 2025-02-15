import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import { tasks } from "@/db/schema";
import { verifyToken } from "@/lib/auth";
import { eq } from "drizzle-orm";



export async function GET(req: NextRequest) {
  try {

    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    const userId = decoded.userId;

    const allTasks = await db.select().from(tasks).where(eq(tasks.userId, decoded.userId));

    return NextResponse.json({ success: true, data: allTasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// 🔹 POST: Create a New Task
export async function POST(req: NextRequest) {
  try {
    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    // Parse request body
    const { title, description, priority, dueDate } = await req.json();

    // Insert new task into database
    const newTask = await db.insert(tasks).values({
      title,
      description,
      priority,
      dueDate,
      userId: decoded.userId,
    }).returning();

    return NextResponse.json({ message: "Task created successfully", task: newTask }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
