import express from "express";
import { body, validationResult } from "express-validator";
import { addUser, findByUsername, verifyPassword } from "../utils/users";
import { signToken } from "../utils/jwt";
import logger from "../config/logger";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// signup
router.post(
  "/signup",
  body("username").isString().isLength({ min: 3 }),
  body("password").isString().isLength({ min: 6 }),
  body("role").optional().isIn(["ADMIN", "USER"]),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { username, password, role = "USER" } = req.body;
      if (findByUsername(username)) return res.status(409).json({ message: "User exists" });

      const user = await addUser(uuidv4(), username, password, role);
      logger.info("user_signup", { username, role });
      res.status(201).json({ id: user.id, username: user.username, role: user.role });
    } catch (err) {
      next(err);
    }
  }
);

// login
router.post(
  "/login",
  body("username").isString(),
  body("password").isString(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { username, password } = req.body;
      const user = findByUsername(username);
      if (!user) return res.status(401).json({ message: "Invalid credentials" });

      const ok = await verifyPassword(user, password);
      if (!ok) return res.status(401).json({ message: "Invalid credentials" });

      const token = signToken({ sub: user.id, username: user.username, role: user.role });
      res.json({ token });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
