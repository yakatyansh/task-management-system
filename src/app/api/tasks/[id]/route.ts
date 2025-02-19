import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";

// 🗑️ DELETE a Task by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const taskId = parseInt(params.id);

    if (isNaN(taskId)) {
      return NextResponse.json({ error: "Invalid Task ID" }, { status: 400 });
    }

    const deletedTask = await db.delete(tasks).where(eq(tasks.id, taskId)).returning();

    if (deletedTask.length === 0) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error deleting task:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// 🔄 Update a Task by ID

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const taskId = parseInt(params.id);
    const { title, description, priority, status } = await req.json();

    if (isNaN(taskId)) {
      return NextResponse.json({ error: "Invalid Task ID" }, { status: 400 });
    }

    const updatedTask = await db.update(tasks).set({ title, description, priority, status }).where(eq(tasks.id, taskId)).returning();

    if (updatedTask.length === 0) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error updating task:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
