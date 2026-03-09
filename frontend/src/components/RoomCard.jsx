import React from 'react'
import "../styles/roomCard.css"

const RoomCard = ({room}) => {
  return (
    <div>
      <img src={room.image} alt={room.name} />
      <h3>{room.name}</h3>
      <p>₹{room.price} / month</p>
    </div>
  )
}

export default RoomCard
