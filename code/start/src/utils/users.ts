import bcrypt from "bcryptjs";

export type User = {
  id: string;
  username: string;
  passwordHash: string;
  role: "ADMIN" | "USER";
};

const users = new Map<string, User>();

export const addUser = async (id: string, username: string, password: string, role: User["role"]) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const u: User = { id, username, passwordHash: hash, role };
  users.set(username, u);
  return u;
};

export const findByUsername = (username: string) => users.get(username);

export const verifyPassword = (user: User, password: string) => bcrypt.compare(password, user.passwordHash);
