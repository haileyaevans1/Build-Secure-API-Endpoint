import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET || "change_this";

export const signToken = (payload: object): string => {
  const options: SignOptions = {
    expiresIn: process.env.JWT_EXPIRY as jwt.SignOptions["expiresIn"] || "1h",
  };
  return jwt.sign(payload, SECRET, options);
};

export const verifyToken = (token: string) => jwt.verify(token, SECRET);
