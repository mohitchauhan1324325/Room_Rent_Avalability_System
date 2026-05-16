import React, { useEffect } from 'react'
import FavoriteLists from '../components/FavoriteLists'
import { getMyFavoriteRooms } from '../api/roomApi';
import useRooms from '../hooks/useRooms';
import Loader from '../components/Loader';

const FavoriteRoomPage = () => {

  const {
    favorite,
    loading,
    error
  } = useRooms();

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
