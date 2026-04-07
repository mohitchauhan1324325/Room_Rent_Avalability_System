const RoomsFilter = ({ setFilter }) => {
  return (
    <div className="mb-6 flex flex-wrap gap-3">
      
      <button
        onClick={() => setFilter("all")}
        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition duration-200"
      >
        All Rooms
      </button>

      <button
        onClick={() => setFilter("available")}
        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition duration-200"
      >
        Available Rooms
      </button>

    </div>
  );
};

export default RoomsFilter;