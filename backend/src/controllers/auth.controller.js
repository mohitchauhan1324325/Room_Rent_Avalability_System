import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "../db/dbConnect.js";

const publicUser = (user) => ({ _id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role });

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });
    const userRole = ["user", "owner"].includes(role) ? role : "user";
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await query(
      `INSERT INTO users (name, email, password, phone, role)
       VALUES ($1, lower($2), $3, $4, $5)
       RETURNING id AS "_id", name, email, phone, role`,
      [name.trim(), email.trim(), hashedPassword, phone || null, userRole],
    );
    return res.status(201).json({ message: "User registered successfully", user: publicUser(result.rows[0]) });
  } catch (error) {
    if (error.code === "23505") return res.status(400).json({ message: "User already exists" });
    return res.status(500).json({ message: "Unable to register user" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });
    const result = await query(
      `SELECT id AS "_id", name, email, phone, role, password FROM users WHERE email = lower($1)`,
      [email.trim()],
    );
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(400).json({ message: "Invalid email or password" });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return res.status(200).json({ token, user: publicUser(user) });
  } catch {
    return res.status(500).json({ message: "Unable to log in" });
  }
};
