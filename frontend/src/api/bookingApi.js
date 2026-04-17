import api from "../utils/api";

export const bookRoom = async (data) => {
    try {
        const res = await api.post("/api/confirm", data);
        return res.data;

    } catch (error) {
        throw error;
    }
};

export const getBookings = async () => {
    try {
        const res = await api.get("/api/users");
        return res.data;

    } catch (error) {
        throw error;
    }
};

export const deleteBooking = async (id) => {
    try {
        const res = await api.delete(`/api/cancelBookings/${id}`);
        return res.data;

    } catch (error) {
        throw error;
    }
};

export const cancelBookingByUser = async (id) => {
    try {
        const res = await api.delete(`/api/cancel/${id}`);
        return res.data;

    } catch (error) {
        throw error;
    }
}

export const getMyBooking = async () => {
    try {
        const res = await api.get("/api/myBooking");
        return res.data;
    } catch (error) {
        throw error;
    }
}


