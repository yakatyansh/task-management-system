import { NextRequest,NextResponse } from "next/server";
import { db } from "@/db/index";
import { users } from "@/db/schema";
import { hashpassword,comparePasswords,generateToken } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
   try{

    const {email,password} = await req.json();
    const user = await db.select().from(users).where(eq(users.email,email));
    if(user.length === 0){
        return NextResponse.json({error:"Invalid email or password"},{status:401});
    }
    const isMatch = await comparePasswords(password, user[0].passwordHash);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const token = generateToken(user[0].id);
    return NextResponse.json({ token, message: "Login successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
