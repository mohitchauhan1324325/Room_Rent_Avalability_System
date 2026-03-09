import React, { use } from 'react'
import RoomCard from '../components/RoomCard';
import "../styles/rooms.css";
import { useState, useEffect } from 'react';

const rooms = [
    {
        id: 1,
        name: "Delux Room",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqiuAMSa4VB_WQoxVPv9KAkka2wP85gQvRHQ&s",
        price: 15000
    },
       {
        id: 2,
        name: "Standard Room",
        image: "https://imagecdn.99acres.com/media1/25777/13/515553135M-1765618507599.jpg",
        price: 5500
    },
       {
        id: 3,
        name: "One Room set",
        image: "https://imagecdn.99acres.com/media1/32707/4/654144151M-1759148063318.jpg",
        price: 4500
    },
       {
        id: 4,
        name: "Two Room Set",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqiuAMSa4VB_WQoxVPv9KAkka2wP85gQvRHQ&s",
        price: 7500
    },
       {
        id: 5,
        name: "3 BHK Room",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqiuAMSa4VB_WQoxVPv9KAkka2wP85gQvRHQ&s",
        price: 10500
    }
];

const RoomsPage = () => {  

  return (
    <div className='rooms-page'>
        {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
        ))}
    </div>
  )
}
export default RoomsPage
