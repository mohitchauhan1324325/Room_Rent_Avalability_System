import React, { useEffect } from 'react'
import FavoriteLists from '../components/FavoriteLists'
import Loader from '../components/Loader';
import useFavoriteRooms from '../hooks/useFavoriteRooms';

const FavoriteRoomPage = () => {

  const {
    favorite,
    loading,
    error
  } = useFavoriteRooms();

  if(loading) return <Loader />
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
