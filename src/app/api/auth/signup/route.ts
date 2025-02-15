import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import { users } from "@/db/schema";
import { comparePasswords, generateToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Find the user
    const user = await db.select().from(users).where(users.email.equals(email)).limit(1);
    if (user.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Compare password
    const isMatch = await comparePasswords(password, user[0].passwordHash);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT token
    const token = generateToken(user[0].id);

    return NextResponse.json({ token, message: "Login successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
