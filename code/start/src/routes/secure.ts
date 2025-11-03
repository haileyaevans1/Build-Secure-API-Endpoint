import express from "express";
import requireAuth from "../middleware/auth";
import { requireRole } from "../middleware/role";

const router = express.Router();

router.get("/public", (req, res) => {
  res.json({ message: "public endpoint - no auth required" });
});

router.get("/admin", requireAuth, requireRole("ADMIN"), (req, res) => {
  res.json({ message: "hello admin - sensitive data" });
});

router.get("/me", requireAuth, (req: any, res) => {
  res.json({ user: req.user });
});

export default router;
