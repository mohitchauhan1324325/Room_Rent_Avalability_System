import api from "../utils/api";

export const createOrder = async (roomId) => {
    try {
        const res = await api.post("/api/create-order", { roomId });
        return res.data;

    } catch (error) {
        throw error;
    }
};

export const verifyPayment = async(response) => {
    try {
        const res = await api.post("/api/verify", response);
        return res.data;

    } catch (error) {
        throw error;
    }
}
