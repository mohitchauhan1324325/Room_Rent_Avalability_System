import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import {
  cancelBookingByAdmin,
  deleteRoomByAdmin,
  deleteUserByAdmin,
  getAdminDashboard,
  getAdminManagementData,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get(
  "/admin/dashboard",
  protect,
  authorizeRoles("admin"),
  getAdminDashboard
);

router.get(
  "/admin/management",
  protect,
  authorizeRoles("admin"),
  getAdminManagementData
);

router.delete(
  "/admin/users/:id",
  protect,
  authorizeRoles("admin"),
  deleteUserByAdmin
);

router.delete(
  "/admin/rooms/:id",
  protect,
  authorizeRoles("admin"),
  deleteRoomByAdmin
);

router.put(
  "/admin/bookings/:id/cancel",
  protect,
  authorizeRoles("admin"),
  cancelBookingByAdmin
);

export default router;
