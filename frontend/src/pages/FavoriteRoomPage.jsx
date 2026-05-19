import React, { useEffect } from 'react'
import FavoriteLists from '../components/FavoriteLists.jsx'
import Loader from '../components/Loader.jsx';
import useFavoriteRooms from '../hooks/useFavoriteRooms.js';

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
