import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const registerUser = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      phone,
      role
    } = req.body;

    if (
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        message: "All fields required"
      });
    }

    const userExists =
      await User.findOne({
        email
      }).lean();

    if (userExists) {
      return res.status(400).json({
        message:
          "User already exists"
      });
    }

    const allowedRoles =
      ["user", "owner"];

    const userRole =
      allowedRoles.includes(role)
        ? role
        : "user";

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        role: userRole
      });

    res.status(201).json({

      message:
        "User registered successfully",

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


export const loginUser = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    if (
      !email ||
      !password
    ) {
      return res.status(400).json({
        message:
          "Email and password required"
      });
    }

    const user =
      await User.findOne({
        email
      })
        .select(
          "_id name email phone role password"
        );

    if (!user) {
      return res.status(400).json({
        message:
          "Invalid email"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Invalid password"
      });
    }

    const token =
      jwt.sign(
        {
          id: user._id,
          role: user.role
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d"
        }
      );

    res.status(200).json({

      token,

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};