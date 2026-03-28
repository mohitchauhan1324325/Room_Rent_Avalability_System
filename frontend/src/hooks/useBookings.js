import { useEffect, useState } from 'react'
import { deleteBooking, getBookings } from '../api/bookingApi';

const useBookings = () => {

    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await getBookings();
                setUsers(res);
                setLoading(false);

            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    const handleDeleteBooking = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (!confirmDelete) return;

        try {
            await deleteBooking(id);
            setUsers(prev => prev.filter(b => b._id !== id));

        } catch (error) {
            setError(error);
        }
    }

    return {
        users,
        handleDeleteBooking,
        loading,
        error
    }
}

export default useBookings
