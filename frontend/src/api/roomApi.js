import api from "../utils/api";

export const getRooms = async () => {
    try {
        const room = await api.get("/api/rooms");
        return room.data;

    } catch (error) {
        throw error;
    }
};

export const getRoomById = async (id) => {
    try {
        const room = await api.get(`/api/rooms/${id}`);
        return room.data;
    } catch (error) {
        throw error;
    }
};

export const createRoom = async (data) => {
    try {
        await api.post("/api/rooms", data);

    } catch (error) {
        throw error;
    }
};

export const createFavoriteRoom = async (id) => {
    try {
        await api.post(`/api/favoriteRoom/${id}`);

    } catch (error) {
        throw error;
    }
}

export const getMyFavoriteRooms = async () => {
    try {
        
        const res = await api.get("/api/favoriteRooms");

        return res.data;

    } catch (error) {
        throw error;
    }
}

export const deleteRoom = async (id) => {
    try {
        await api.delete(`/api/rooms/${id}`);

    } catch (error) {
        throw error;
    }
};

export const deleteAllRooms = async () => {
    try {
        await api.delete("/api/rooms");

    } catch (error) {
        throw error;
    }
};

export const updateRoom = async (id, data) => {
    try {
        await api.put(`/api/rooms/${id}`, data);

    } catch (error) {
        throw error;
    }
};