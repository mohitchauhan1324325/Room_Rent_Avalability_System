import React from "react";
import { Phone, Hash, MapPin, CalendarDays, CreditCard, Trash2 } from "lucide-react";

const UserBookingDetails = ({ booking, deleteBooking }) => {
  const room = booking?.roomId || booking?.room || {};
  const user = booking?.user || booking?.bookedBy || {};
  const paymentStatus = booking?.paymentStatus || booking?.payment?.status || "pending";
  const imageUrl = room?.images?.[0] || room?.image || booking?.image || "https://placehold.co/800x400";
  const title = room?.title || booking?.roomTitle || user?.name || "Booking";
  const location = room?.location || booking?.location || "Unknown Location";
  const phone = user?.phone || booking?.phone || "No phone provided";

  return (
    <div className="w-full mx-auto overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-xl border border-gray-200/60 dark:border-gray-700/60 transition-all duration-300 group">
      <div className="relative h-56 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img
          src={imageUrl}
          alt="Room"
          className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
              paymentStatus === "paid"
                ? "bg-green-500 text-white"
                : "bg-yellow-400 text-yellow-900"
            }`}
          >
            {paymentStatus}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1 mb-4">
          {title}
        </h2>

        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-start gap-3">
            <MapPin className="text-brand-500 mt-0.5 shrink-0" size={16} />
            <span className="line-clamp-2">{location}</span>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays className="text-brand-500 shrink-0" size={16} />
            <span>
              <span className="font-medium">Move In:</span>{" "}
              {booking?.moveInDate ? new Date(booking.moveInDate).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) : "TBD"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <CreditCard className="text-brand-500 shrink-0" size={16} />
            <span>
              <span className="font-medium">Booked:</span>{" "}
              {booking?.createdAt ? new Date(booking.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) : "N/A"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="text-brand-500 shrink-0" size={16} />
            <span>{phone}</span>
          </div>
        </div>

        <button
          onClick={() => deleteBooking(booking?._id)}
          className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 py-3 font-semibold transition-colors border border-red-100 dark:border-red-900/30"
        >
          <Trash2 size={18} />
          Cancel Reservation
        </button>
      </div>
    </div>
  );
};

export default UserBookingDetails;
