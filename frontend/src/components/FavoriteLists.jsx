import React from 'react'

const FavoriteLists = ({ favorite }) => {
    return (
        <div>
            {favorite.map((room) => (
                <div key={room?._id}
                    className='flex gap-20'
                >
                    <p>{room?.room?.title}</p>
                    <p>{room?.room?._id}</p>
                </div>
            ))}
        </div>
    )
}

export default FavoriteLists
