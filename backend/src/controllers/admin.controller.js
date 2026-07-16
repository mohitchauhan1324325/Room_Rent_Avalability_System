import { User } from "../models/user.models.js";
import Room from "../models/rooms.models.js";
import { Booking } from "../models/booking.models.js";
import cloudinary from "../config/cloudinary.js";

export const getAdminDashboard = async (req, res) => {
  try {
    const [
      totalUsers,
      totalOwners,
      totalCustomers,
      totalRooms,
      availableRooms,
      bookedRooms,
      totalBookings,
      confirmedBookings,
      cancelledBookings,
      recentUsers,
      recentRooms,
      recentBookings,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "owner" }),
      User.countDocuments({ role: "user" }),
      Room.countDocuments(),
      Room.countDocuments({ isAvailable: true }),
      Room.countDocuments({ isAvailable: false }),
      Booking.countDocuments(),
      Booking.countDocuments({ status: "confirmed" }),
      Booking.countDocuments({ status: "cancelled" }),
      User.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name email role createdAt")
        .lean(),
      Room.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("owner", "name role")
        .select("title location price isAvailable createdAt owner")
        .lean(),
      Booking.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("user", "name")
        .populate("roomId", "title")
        .select("status paymentStatus createdAt user roomId")
        .lean(),
    ]);

    const recentActivity = [
      ...recentUsers.map((user) => ({
        type: "user",
        title: `${user.name} joined`,
        description: `${user.role} account created`,
        createdAt: user.createdAt,
      })),
      ...recentRooms.map((room) => ({
        type: "room",
        title: room.title,
        description: `${room.isAvailable ? "Available" : "Booked"} • ${room.location}`,
        createdAt: room.createdAt,
      })),
      ...recentBookings.map((booking) => ({
        type: "booking",
        title: booking.roomId?.title || "Booking",
        description: `${booking.user?.name || "User"} • ${booking.status}`,
        createdAt: booking.createdAt,
      })),
    ]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);

    res.status(200).json({
      stats: {
        totalUsers,
        totalOwners,
        totalCustomers,
        totalRooms,
        availableRooms,
        bookedRooms,
        totalBookings,
        confirmedBookings,
        cancelledBookings,
      },
      recentUsers,
      recentRooms: recentRooms.map((room) => ({
        ...room,
        ownerName: room.owner?.name || "Unknown",
      })),
      recentBookings: recentBookings.map((booking) => ({
        ...booking,
        userName: booking.user?.name || "Unknown",
        roomTitle: booking.roomId?.title || "Unknown",
      })),
      recentActivity,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminManagementData = async (req, res) => {
  try {
    const { tab = "users", search = "", filter = "all" } = req.query;

    const searchRegex = new RegExp(search, "i");

    if (tab === "users") {
      const users = await User.find({
        $or: [
          { name: searchRegex },
          { email: searchRegex },
          { role: searchRegex },
        ],
      })
        .sort({ createdAt: -1 })
        .select("_id name email phone role createdAt")
        .lean();

      return res.status(200).json({ users });
    }

    if (tab === "rooms") {
      const query = search
        ? {
            $or: [
              { title: searchRegex },
              { location: searchRegex },
            ],
          }
        : {};

      if (filter !== "all") {
        query.isAvailable = filter === "available";
      }

      const rooms = await Room.find(query)
        .populate("owner", "name email")
        .sort({ createdAt: -1 })
        .select("_id title location price isAvailable createdAt owner")
        .lean();

      return res.status(200).json({ rooms });
    }

    const query = {};
    if (search) {
      query.$or = [
        { status: searchRegex },
        { paymentStatus: searchRegex },
      ];
    }

    if (filter !== "all") {
      query.status = filter;
    }

    const bookings = await Booking.find(query)
      .populate("user", "name email")
      .populate("roomId", "title location")
      .sort({ createdAt: -1 })
      .select("_id status paymentStatus createdAt user roomId")
      .lean();

    return res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUserByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRoomByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id).lean();

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    for (const image of room.images || []) {
      if (image.includes("cloudinary")) {
        const publicId = image.split("/").slice(-1)[0].split(".")[0];
        await cloudinary.uploader.destroy(`rooms/${publicId}`);
      }
    }

    await Booking.deleteMany({ roomId: id });
    await Room.findByIdAndDelete(id);

    res.status(200).json({ message: "Room deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelBookingByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id).lean();

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await Room.findByIdAndUpdate(booking.roomId, { isAvailable: true });
    await Booking.findByIdAndUpdate(id, { status: "cancelled" });

    res.status(200).json({ message: "Booking cancelled" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
