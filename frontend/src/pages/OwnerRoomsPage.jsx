import React from "react";
import { useNavigate } from "react-router-dom";
import useRooms from "../hooks/useRooms";
import useBookings from "../hooks/useBookings";
import {
  Plus,
  BedDouble,
  CheckCircle,
  XCircle,
  ArrowRight,
} from "lucide-react";

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const { rooms, loading } = useRooms({ ownerOnly: true });
  const { bookings, loading: bookingLoading } = useBookings();
  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(r => r.isAvailable).length;
  const unavailableRooms = totalRooms - availableRooms;
  const recentRooms = rooms.slice(0, 3);
  const ownerRooms = rooms;

  const stats = [
    {
      title: "Total Rooms",
      value: totalRooms,
      icon: <BedDouble size={28} />,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Available",
      value: availableRooms,
      icon: <CheckCircle size={28} />,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Unavailable",
      value: unavailableRooms,
      icon: <XCircle size={28} />,
      bg: "bg-red-100",
      color: "text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 pb-20 pt-28 sm:pt-32 lg:pt-36">
      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <h1 className="text-4xl font-bold">Welcome Back 👋</h1>
            <p className="mt-2 text-indigo-100">
              Here's a quick overview of your properties.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/AddRooms")}
              className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-indigo-600 transition hover:scale-105"
            >
              <Plus size={20} />
              Add Room
            </button>

            <button
              onClick={() => navigate("/owner/bookings")}
              className="rounded-xl border border-white px-6 py-3 font-semibold text-white hover:bg-white hover:text-indigo-600 transition"
            >
              View Bookings
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl bg-white/90 dark:bg-gray-800/90 border border-gray-200/70 dark:border-gray-700/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">{item.title}</p>
                <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>
              </div>

              <div className={`${item.bg} ${item.color} rounded-full p-4`}>
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-white/90 dark:bg-gray-800/90 border border-gray-200/70 dark:border-gray-700/80 p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recent Rooms</h2>

          <button
            onClick={() => navigate("/my-rooms")}
            className="flex items-center gap-2 text-indigo-600 hover:underline"
          >
            View All <ArrowRight size={18} />
          </button>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 animate-pulse rounded-xl bg-gray-100"></div>
            ))}
          </div>
        ) : ownerRooms.length === 0 ? (
          <div className="py-12 text-center">
            <div className="text-6xl">🏠</div>
            <h3 className="mt-4 text-xl font-semibold">No Rooms Yet</h3>
            <p className="mt-2 text-gray-500">
              Add your first room to start receiving bookings.
            </p>
            <button
              onClick={() => navigate("/AddRooms")}
              className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
            >
              Add First Room
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {ownerRooms.map((room) => (
              <div
                key={room._id}
                className="flex flex-col gap-3 rounded-2xl border border-gray-200/70 dark:border-gray-700/80 bg-gray-50/70 dark:bg-gray-900/60 p-4 transition hover:bg-gray-100 dark:hover:bg-gray-800/80 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {room.title || room.roomTitle || "Room"}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {room.location || "Location not available"}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    ₹{room.price}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${room.isAvailable
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                      }`}
                  >
                    {room.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 rounded-2xl bg-white/90 dark:bg-gray-800/90 border border-gray-200/70 dark:border-gray-700/80 p-6 shadow-sm">

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recent Bookings</h2>

          <button
            onClick={() => navigate("/owner/bookings")}
            className="flex items-center gap-2 text-indigo-600 hover:underline"
          >
            View All <ArrowRight size={18} />
          </button>
        </div>

        {bookingLoading ? (
          <p>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-500">No bookings found.</p>
        ) : (
          <div className="space-y-4">
            {bookings.slice(0, 5).map((booking) => (
              <div
                key={booking._id}
                className="rounded-xl border border-gray-200 dark:border-gray-700 p-4"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">
                      {booking.roomId?.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {booking.roomId?.location}
                    </p>

                    <p className="mt-2">
                      <strong>Name:</strong> {booking.user?.name}
                    </p>

                    <p>
                      <strong>Email:</strong> {booking.user?.email}
                    </p>

                    <p>
                      <strong>Phone:</strong> {booking.user?.phone}
                    </p>
                  </div>

                  <div className="text-right">
                    <p>{new Date(booking.moveInDate).toLocaleDateString()}</p>

                    <span className="inline-block mt-2 rounded-full bg-green-100 px-3 py-1 text-green-700 text-sm">
                      {booking.paymentStatus}
                    </span>

                    <br />

                    <span className="inline-block mt-2 rounded-full bg-blue-100 px-3 py-1 text-blue-700 text-sm">
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
