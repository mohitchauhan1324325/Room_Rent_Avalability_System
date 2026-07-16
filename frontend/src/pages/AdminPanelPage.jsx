import React, { useEffect, useState } from "react";
import { Users, Home, CalendarDays, Activity, ArrowRight, TrendingUp, Search, Trash2, XCircle } from "lucide-react";
import {
  cancelBookingByAdmin,
  deleteRoomByAdmin,
  deleteUserByAdmin,
  getAdminDashboard,
  getAdminManagementData,
} from "../api/adminApi";

const AdminPanelPage = () => {
  const [data, setData] = useState({
    stats: {},
    recentActivity: [],
    recentRooms: [],
    recentBookings: [],
  });
  const [management, setManagement] = useState({ users: [], rooms: [], bookings: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("users");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchDashboard = async () => {
    try {
      setError("");
      const res = await getAdminDashboard();
      setData({
        stats: res?.stats || {},
        recentActivity: res?.recentActivity || [],
        recentRooms: res?.recentRooms || [],
        recentBookings: res?.recentBookings || [],
      });
    } catch (error) {
      console.error(error);
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setError("Please sign in as an admin to view the dashboard.");
      } else {
        setError("Unable to load dashboard data right now.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchManagement = async () => {
    try {
      const res = await getAdminManagementData({ tab: activeTab, search, filter });
      const listKey = activeTab === "bookings" ? "bookings" : activeTab;
      setManagement((prev) => ({
        ...prev,
        [listKey]: Array.isArray(res?.[listKey]) ? res[listKey] : [],
      }));
    } catch (error) {
      console.error(error);
      setManagement((prev) => ({ ...prev, [activeTab === "bookings" ? "bookings" : activeTab]: [] }));
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  useEffect(() => {
    fetchManagement();
  }, [activeTab, search, filter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-24">
        <div className="mx-auto max-w-7xl rounded-3xl border border-gray-200/70 bg-white/90 p-8 shadow-sm dark:border-gray-700/80 dark:bg-gray-800/90">
          <div className="h-8 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-700" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const handleDeleteUser = async (id) => {
    try {
      setActionLoading(true);
      await deleteUserByAdmin(id);
      await fetchManagement();
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteRoom = async (id) => {
    try {
      setActionLoading(true);
      await deleteRoomByAdmin(id);
      await fetchManagement();
      await fetchDashboard();
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelBooking = async (id) => {
    try {
      setActionLoading(true);
      await cancelBookingByAdmin(id);
      await fetchManagement();
      await fetchDashboard();
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  };

  const stats = [
    {
      title: "Total Users",
      value: data.stats?.totalUsers ?? 0,
      icon: <Users size={24} />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Total Rooms",
      value: data.stats?.totalRooms ?? 0,
      icon: <Home size={24} />,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Bookings",
      value: data.stats?.totalBookings ?? 0,
      icon: <CalendarDays size={24} />,
      color: "from-emerald-500 to-green-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-24 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-8 text-white shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-indigo-100">Admin Control Center</p>
              <h1 className="mt-2 text-3xl font-bold">Monitor platform activity</h1>
              <p className="mt-2 max-w-2xl text-indigo-100">
                Track users, rooms, bookings and recent platform activity from one place.
              </p>
            </div>
            <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <TrendingUp size={18} />
                Live overview
              </div>
            </div>
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-700/50 dark:bg-amber-900/20 dark:text-amber-300">
            {error}
          </div>
        ) : null}

        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((item) => (
            <div key={item.title} className="rounded-2xl border border-gray-200/70 bg-white/90 p-6 shadow-sm dark:border-gray-700/80 dark:bg-gray-800/90">
              <div className={`inline-flex rounded-2xl bg-gradient-to-r ${item.color} p-3 text-white`}>
                {item.icon}
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">{item.title}</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{item.value}</h2>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-200/70 bg-white/90 p-6 shadow-sm dark:border-gray-700/80 dark:bg-gray-800/90">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Quick Stats</h3>
              <Activity size={18} className="text-indigo-500" />
            </div>
            <div className="mt-6 space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-700/40">
                <span>Owners</span>
                <span className="font-semibold">{data.stats?.totalOwners ?? 0}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-700/40">
                <span>Customers</span>
                <span className="font-semibold">{data.stats?.totalCustomers ?? 0}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-700/40">
                <span>Available Rooms</span>
                <span className="font-semibold">{data.stats?.availableRooms ?? 0}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-700/40">
                <span>Booked Rooms</span>
                <span className="font-semibold">{data.stats?.bookedRooms ?? 0}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-700/40">
                <span>Confirmed Bookings</span>
                <span className="font-semibold">{data.stats?.confirmedBookings ?? 0}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-700/40">
                <span>Cancelled Bookings</span>
                <span className="font-semibold">{data.stats?.cancelledBookings ?? 0}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200/70 bg-white/90 p-6 shadow-sm dark:border-gray-700/80 dark:bg-gray-800/90 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
              <button className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:underline">
                View More <ArrowRight size={16} />
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {(data.recentActivity || []).length > 0 ? (
                (data.recentActivity || []).map((item, index) => (
                  <div key={`${item.title}-${index}`} className="flex items-start justify-between rounded-xl border border-gray-200/70 bg-gray-50 px-4 py-3 dark:border-gray-700/70 dark:bg-gray-700/40">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{item.title}</p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-gray-300 px-4 py-6 text-center text-sm text-gray-500 dark:border-gray-600 dark:text-gray-400">
                  No recent activity yet.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200/70 bg-white/90 p-6 shadow-sm dark:border-gray-700/80 dark:bg-gray-800/90">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Rooms</h3>
            <div className="mt-6 space-y-4">
              {(data.recentRooms || []).length > 0 ? (
                (data.recentRooms || []).map((room) => (
                  <div key={room._id} className="rounded-xl border border-gray-200/70 bg-gray-50 px-4 py-3 dark:border-gray-700/70 dark:bg-gray-700/40">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{room.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{room.location}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${room.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {room.isAvailable ? "Available" : "Booked"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Owner: {room.ownerName}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-gray-300 px-4 py-6 text-center text-sm text-gray-500 dark:border-gray-600 dark:text-gray-400">
                  No rooms added yet.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200/70 bg-white/90 p-6 shadow-sm dark:border-gray-700/80 dark:bg-gray-800/90">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Bookings</h3>
            <div className="mt-6 space-y-4">
              {(data.recentBookings || []).length > 0 ? (
                (data.recentBookings || []).map((booking) => (
                  <div key={booking._id} className="rounded-xl border border-gray-200/70 bg-gray-50 px-4 py-3 dark:border-gray-700/70 dark:bg-gray-700/40">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{booking.roomTitle}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{booking.userName}</p>
                      </div>
                      <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-gray-300 px-4 py-6 text-center text-sm text-gray-500 dark:border-gray-600 dark:text-gray-400">
                  No bookings yet.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200/70 bg-white/90 p-6 shadow-sm dark:border-gray-700/80 dark:bg-gray-800/90">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Management Panel</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Search and manage users, rooms and bookings.</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-700/40">
                <Search size={16} className="text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                  className="w-full bg-transparent text-sm outline-none dark:text-white"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none dark:border-gray-700 dark:bg-gray-700/40 dark:text-white"
              >
                <option value="all">All</option>
                <option value="available">Available</option>
                <option value="booked">Booked</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            {['users', 'rooms', 'bookings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${activeTab === tab ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200/70 dark:border-gray-700/70">
            {activeTab === 'users' && (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {(management.users || []).map((user) => (
                  <div key={user._id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-200">{user.role}</span>
                      <button onClick={() => handleDeleteUser(user._id)} className="rounded-full p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'rooms' && (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {(management.rooms || []).map((room) => (
                  <div key={room._id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{room.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{room.location} • ₹{room.price}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${room.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{room.isAvailable ? 'Available' : 'Booked'}</span>
                      <button onClick={() => handleDeleteRoom(room._id)} className="rounded-full p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {(management.bookings || []).map((booking) => (
                  <div key={booking._id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{booking.roomId?.title || 'Booking'}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{booking.user?.name || 'User'} • {booking.status}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">{booking.paymentStatus}</span>
                      <button onClick={() => handleCancelBooking(booking._id)} className="rounded-full p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                        <XCircle size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelPage;
