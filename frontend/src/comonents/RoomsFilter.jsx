const RoomsFilter = ({ setFilter }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <button onClick={() => setFilter("all")}>
        All Rooms
      </button>

      <button onClick={() => setFilter("available")} style={{ marginLeft: "10px" }}>
        Available Rooms
      </button>
    </div>
  );
}

export default RoomsFilter;