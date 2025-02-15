import jwt,{JwtPayload} from 'jsonwebtoken';
import bcrypt from 'bcryptjs';



const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

interface DecodedToken extends JwtPayload {
  userId: number;
}

export async function hashpassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePasswords(normalpassword: string, hashpassword: string) {
  return bcrypt.compare(normalpassword, hashpassword);
}

export function generateToken(userId: number) {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
  }

  export function verifyToken(token: string): DecodedToken {
    console.log("🔹 Received Token:", token);
    const decoded = jwt.verify(token, JWT_SECRET);
    
    if (typeof decoded === "string") {
      throw new Error("Invalid token format");
    }
    return decoded as DecodedToken;
  }