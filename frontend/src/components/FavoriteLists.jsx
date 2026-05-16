import React from 'react'

const FavoriteLists = ({ favorite }) => {
    return (
        <div>
            {favorite.map((room) => (
                <div key={room._id}>
                    <p>{room.room}</p>
                </div>
            ))}
        </div>
    )
}

export default FavoriteLists
