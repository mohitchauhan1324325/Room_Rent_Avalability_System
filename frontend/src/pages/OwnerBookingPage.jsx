import React from "react";
import { useNavigate } from "react-router-dom";
import useBookings from "../hooks/useBookings";
import { deleteBooking } from "../api/bookingApi";
import { toast } from "react-toastify";

const OwnerBookingsPage = () => {
    const navigate = useNavigate();

    const {
        bookings,
        loading,
        handleDeleteBooking,
        fetchBookings,
    } = useBookings();

    if (loading) {
        return (
            <div className="pt-32 text-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-28 p-6">

            <div className="mb-8 flex items-center justify-between">

                <div>
                    <h1 className="text-4xl font-bold">
                        Manage Bookings
                    </h1>

                    <p className="text-gray-500 mt-2">
                        View all bookings for your rooms.
                    </p>
                </div>

                <button
                    onClick={() => navigate(-1)}
                    className="rounded-lg bg-indigo-600 px-5 py-3 text-white"
                >
                    Back
                </button>

            </div>

            {bookings.length === 0 ? (
                <div className="rounded-xl bg-white p-10 text-center shadow">

                    <h2 className="text-2xl font-bold">
                        No Bookings Yet
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Your bookings will appear here.
                    </p>

                </div>
            ) : (

                <div className="grid gap-6">

                    {bookings.map((booking) => (

                        <div
                            key={booking._id}
                            className="rounded-2xl bg-white dark:bg-gray-800 shadow p-6 border"
                        >

                            <div className="flex flex-col lg:flex-row justify-between gap-6">

                                <div>

                                    <h2 className="text-2xl font-bold">
                                        {booking.roomId?.title}
                                    </h2>

                                    <p className="text-gray-500">
                                        {booking.roomId?.location}
                                    </p>

                                    <div className="mt-5 space-y-1">

                                        <p>
                                            <strong>Name:</strong>{" "}
                                            {booking.user?.name}
                                        </p>

                                        <p>
                                            <strong>Email:</strong>{" "}
                                            {booking.user?.email}
                                        </p>

                                        <p>
                                            <strong>Phone:</strong>{" "}
                                            {booking.user?.phone}
                                        </p>

                                    </div>

                                </div>

                                <div className="space-y-3">

                                    <p>
                                        <strong>Move In:</strong>{" "}
                                        {new Date(
                                            booking.moveInDate
                                        ).toLocaleDateString()}
                                    </p>

                                    <p>
                                        <strong>Payment:</strong>{" "}
                                        <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
                                            {booking.paymentStatus}
                                        </span>
                                    </p>

                                    <p>
                                        <strong>Status:</strong>{" "}
                                        <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">
                                            {booking.status}
                                        </span>
                                    </p>

                                    {booking.status !== "cancelled" && (
                                        <button
                                            onClick={() => handleDeleteBooking(booking._id)}
                                            className="mt-3 rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
                                        >
                                            Cancel Booking
                                        </button>
                                    )}

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default OwnerBookingsPage;