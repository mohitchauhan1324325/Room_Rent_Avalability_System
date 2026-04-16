import React from 'react'
import useBookings from '../hooks/useBookings'
import Loader from '../components/Loader';
import UserBookingDetails from '../components/UserBookingDetails';
import { useEffect } from 'react';
import { getUserRole } from '../utils/auth';

const UserBookingPage = () => {
  const {
    userBooking,
    handleDetailBooking,
    handleDeleteBooking,
    loading,
    error,
  } = useBookings();
  const role = getUserRole();
  
  useEffect(() => {
    handleDetailBooking();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  if (userBooking.length === 0) {
    return <p>No bookings</p>;
  }

  return (
    <>
      {userBooking.map((booking) => (
        <UserBookingDetails
          key={booking._id}
          booking={booking}
          deleteBooking={handleDeleteBooking}
        />
      ))}
    </>
  );
};

export default UserBookingPage
