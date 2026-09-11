import { useState, useEffect } from "react";

import {
    getRooms,
    getMyRooms,
    deleteRoom,
    deleteAllRooms,
} from "../api/roomApi.js";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isAuthenticated } from "../utils/auth.js";
import Swal from "sweetalert2";

const useRooms = (options = {}) => {
    const navigate = useNavigate();

    const { ownerOnly = false } = options;

    const [rooms, setRooms] = useState([]);
    const [filter, setFilter] = useState("all");

    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    const [error, setError] = useState(null);

    const [pagination, setPagination] = useState({
        nextCursor: null,
        hasMore: false,
        limit: 10,
    });

    // --------------------------------
    // Initial rooms fetch
    // --------------------------------

    const fetchRooms = async () => {
        try {
            setLoading(true);
            setError(null);

            if (ownerOnly) {
                const data = await getMyRooms();

                setRooms(Array.isArray(data) ? data : []);

                setPagination({
                    nextCursor: null,
                    hasMore: false,
                    limit: data?.length || 0,
                });

                return;
            }

            const response = await getRooms(null, 10);

            /*
                Backend response:

                {
                    data: [...],
                    pagination: {
                        limit,
                        nextCursor,
                        hasMore
                    }
                }
            */

            setRooms(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

            setPagination(
                response.pagination || {
                    nextCursor: null,
                    hasMore: false,
                    limit: 10,
                }
            );

        } catch (err) {
            console.error("FETCH ROOMS ERROR:", err);

            setError(
                "Failed to fetch rooms: " +
                (err.response?.data?.message || err.message)
            );
        } finally {
            setLoading(false);
        }
    };

    // --------------------------------
    // Load next page
    // --------------------------------

    const loadMoreRooms = async () => {
        if (
            loadingMore ||
            !pagination.hasMore ||
            !pagination.nextCursor ||
            ownerOnly
        ) {
            return;
        }

        try {
            setLoadingMore(true);
            setError(null);

            const response = await getRooms(
                pagination.nextCursor,
                pagination.limit
            );

            const newRooms = Array.isArray(response.data)
                ? response.data
                : [];

            // Add new rooms to existing rooms
            setRooms((prevRooms) => [
                ...prevRooms,
                ...newRooms,
            ]);

            // Update cursor
            setPagination(
                response.pagination || {
                    nextCursor: null,
                    hasMore: false,
                    limit: pagination.limit,
                }
            );

        } catch (err) {
            console.error("LOAD MORE ROOMS ERROR:", err);

            setError(
                "Failed to load more rooms: " +
                (err.response?.data?.message || err.message)
            );
        } finally {
            setLoadingMore(false);
        }
    };

    // --------------------------------
    // Edit
    // --------------------------------

    const handleEdit = (id) => {
        navigate(`/EditRooms/${id}`);
    };

    // --------------------------------
    // Details
    // --------------------------------

    const handleDetails = (id) => {
        navigate(`/RoomDetails/${id}`);
    };

    // --------------------------------
    // Delete ALL rooms
    // --------------------------------

    const handleDeleteAllRooms = async () => {
        if (!isAuthenticated()) {
            navigate("/register");
            return;
        }

        const result = await Swal.fire({
            title: "Delete ALL rooms?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete all!",
        });

        if (!result.isConfirmed) return;

        try {
            setLoading(true);

            await deleteAllRooms();

            setRooms([]);

            setPagination({
                nextCursor: null,
                hasMore: false,
                limit: 10,
            });

            toast.success(
                "All rooms deleted successfully!"
            );

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // --------------------------------
    // Delete room
    // --------------------------------

    const handleDelete = async (id) => {
        if (!isAuthenticated()) {
            navigate("/register");
            return;
        }

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This room will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
        });

        if (!result.isConfirmed) return;

        try {
            setLoading(true);

            await deleteRoom(id);

            setRooms((prev) =>
                prev.filter(
                    (room) => room._id !== id
                )
            );

            toast.success("Room deleted");

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // --------------------------------
    // Filter
    // --------------------------------

    const filteredRooms =
        filter === "available"
            ? rooms.filter(
                (room) => room.isAvailable
            )
            : rooms;

    // --------------------------------
    // Initial API call
    // --------------------------------

    useEffect(() => {
        fetchRooms();
    }, [ownerOnly]);

    return {
        rooms,
        filteredRooms,

        setFilter,

        handleDeleteAllRooms,
        handleDelete,

        handleEdit,
        handleDetails,

        loading,
        loadingMore,

        error,

        pagination,

        loadMoreRooms,
    };
};

export default useRooms;