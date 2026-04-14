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
        await api.delete(`/api/bookings/${id}`);

    } catch (error) {
        throw error;
    }
};


