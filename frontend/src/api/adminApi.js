import api from "../utils/api";

export const getAdminDashboard = async () => {
  try {
    const res = await api.get("/api/admin/dashboard");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAdminManagementData = async ({ tab, search, filter }) => {
  try {
    const params = new URLSearchParams();
    if (tab) params.append("tab", tab);
    if (search) params.append("search", search);
    if (filter) params.append("filter", filter);

    const res = await api.get(`/api/admin/management?${params.toString()}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserByAdmin = async (id) => {
  try {
    const res = await api.delete(`/api/admin/users/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRoomByAdmin = async (id) => {
  try {
    const res = await api.delete(`/api/admin/rooms/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const cancelBookingByAdmin = async (id) => {
  try {
    const res = await api.put(`/api/admin/bookings/${id}/cancel`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
