import api from "../utils/api";

export const getRooms = async (cursor = null, limit = 10) => {
    try {
        const params = {
            limit,
        };

        if (cursor) {
            params.cursor = cursor;
        }

        const response = await api.get("/api/rooms", {
            params,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getMyRooms = async () => {
    try {
        const response = await api.get("/api/myRooms");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getRoomById = async (id) => {
    try {
        const response = await api.get(`/api/rooms/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createRoom = async (data) => {
    try {
        const response = await api.post("/api/rooms", data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createFavoriteRoom = async (id) => {
    try {
        const response = await api.post(`/api/favoriteRoom/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getMyFavoriteRooms = async () => {
    try {
        const response = await api.get("/api/favoriteRooms");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteRoom = async (id) => {
    try {
        const response = await api.delete(`/api/rooms/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteAllRooms = async () => {
    try {
        const response = await api.delete("/api/rooms");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateRoom = async (id, data) => {
    try {
        const response = await api.put(`/api/rooms/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};