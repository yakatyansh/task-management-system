import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

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

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
    }
    