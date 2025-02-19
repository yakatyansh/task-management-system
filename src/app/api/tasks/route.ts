import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import { tasks } from "@/db/schema";
import { verifyToken } from "@/lib/auth";
import { and, eq, ilike, gte, lte, desc, asc } from "drizzle-orm";


export async function POST(req: NextRequest) {
  try {
    const { title, description, priority, status } = await req.json();
    
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    const newTask = await db.insert(tasks).values({
      title,
      description: description || "",
      priority: priority || 1,
      status: status || "pending",
    }).returning();

    return NextResponse.json({ message: "Task created successfully", task: newTask }, { status: 201 });
  }catch (error) {
    console.error("❌ Error in Task Creation:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    const userId = decoded.userId;

    // Get query params for filtering & sorting
    const { search, status, priority, category, project, fromDate, toDate, sortBy } =
      Object.fromEntries(req.nextUrl.searchParams);

    let whereClause = and(eq(tasks.userId, userId)); // Always filter by user ID

    // 🔍 Search by title/description
    if (search) {
      whereClause = and(whereClause, ilike(tasks.title, `%${search}%`));
    }

    // 🏷️ Filter by status
    if (status) {
      whereClause = and(whereClause, eq(tasks.status, status));
    }

    // 🔥 Filter by priority
    if (priority) {
      whereClause = and(whereClause, eq(tasks.priority, Number(priority)));
    }

    // 📂 Filter by category
    if (category) {
      whereClause = and(whereClause, eq(tasks.categoryId, Number(category)));
    }

    // 📂 Filter by project
    if (project) {
      whereClause = and(whereClause, eq(tasks.projectId, Number(project)));
    }

    // 📅 Filter by due date range
    if (fromDate) {
      whereClause = and(whereClause, gte(tasks.dueDate, new Date(fromDate)));
    }
    if (toDate) {
      whereClause = and(whereClause, lte(tasks.dueDate, new Date(toDate)));
    }

    // 🔄 Sorting (default: Newest First)
    let orderBy = desc(tasks.createdAt);
    if (sortBy === "oldest") {
      orderBy = asc(tasks.createdAt);
    } else if (sortBy === "priority") {
      orderBy = asc(tasks.priority); // Lower number = higher priority
    }

    // Fetch filtered & sorted tasks
    const filteredTasks = await db.select().from(tasks).where(whereClause).orderBy(orderBy);

    return NextResponse.json({ success: true, data: filteredTasks }, { status: 200 });
  } catch (error) {
    console.error("❌ Error in GET /api/tasks:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
