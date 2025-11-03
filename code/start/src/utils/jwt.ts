import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET || "change_this";

export const signToken = (payload: object) =>
  jwt.sign(payload, SECRET, { expiresIn: process.env.JWT_EXPIRY || "1h" });

export const verifyToken = (token: string) =>
  jwt.verify(token, SECRET);
