import { useNavigate } from "react-router-dom";

const RoomCard = ({ rooms, handleDelete, handleEdit, handleDetails }) => {

  const navigate = useNavigate();

  return (
    <div>
      {rooms.map((room) => (
      <div
        className="roomCard"
        key={room._id}
        onClick={room.isAvailable 
          ? () => handleDetails(room._id)
          : undefined
        }
      >
        <h3>{room.title}</h3>
        <img src={`${import.meta.env.VITE_API_URL}${room.image}`} alt="room" />
        <p>Price: {room.price}</p>
        <p>Location: {room.location}</p>
        <p>Owner: {room.owner}</p>

        {room.isAvailable ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/booking", { state: room });
            }}
            className="btn-primary"
          >
            Rent Room
          </button>
        ) : (
          <p>Occupied</p>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(room._id);
          }}
        >
          Edit
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(room._id);
          }}
        >
          Delete Room
        </button>
      </div>
      ))}
    </div>
  )
}

export default RoomCard
