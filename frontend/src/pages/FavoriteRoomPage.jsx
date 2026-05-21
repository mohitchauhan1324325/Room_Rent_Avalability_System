import React, { useEffect, useState } from 'react'
import FavoriteLists from '../components/FavoriteLists.jsx'
import Loader from '../components/Loader.jsx';
import useFavoriteRooms from '../hooks/useFavoriteRooms.js';

const FavoriteRoomPage = () => {

  const {
    favorite,
    fetchFavoriteRoom,
    loading,
    error
  } = useFavoriteRooms();

  useEffect(() => {
    fetchFavoriteRoom();
  }, []);

  if (loading) return <Loader />
  if (error) return <p className="text-white text-center mt-10">{error}</p>;

  return (
    <div>
      <FavoriteLists
        favorite={favorite}
      />
    </div>
  )
}

export default FavoriteRoomPage
