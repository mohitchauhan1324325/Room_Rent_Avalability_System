import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { authLimiter } from "../middlewares/rateLimiters.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validation/schemas.js";

const router = express.Router();

router.post("/register", authLimiter, validate(registerSchema), registerUser);
router.post("/login", authLimiter, validate(loginSchema), loginUser);

export default router;
