import express from "express";

import {
    registerUser,
    loginUser,
} from "../controllers/auth.controller.js";

import { validate } from "../middlewares/validate.js";
import {
    loginSchema,
    registerSchema,
} from "../validation/schemas.js";
import { authLimiter } from "../middlewares/rateLimiters.js";

const router = express.Router();

router.get("/auth-test", (req, res) => {
    res.json({
        message: "Auth route working",
    });
});

router.post(
  "/login",
  authLimiter,
  validate(loginSchema),
  loginUser
);

router.post(
  "/register",
  authLimiter,
  validate(registerSchema),
  registerUser
);

export default router;