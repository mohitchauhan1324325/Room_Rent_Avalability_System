import { useState } from "react";

const RoomsFilter = ({ setFilter }) => {
  const [active, setActive] = useState("all");

  const handleClick = (type) => {
    setActive(type);
    setFilter(type);
  };

  return (
    <div className="mb-6 flex flex-wrap gap-3">

      <button
        onClick={() => handleClick("all")}
        className={`px-4 py-2 rounded-lg font-medium transition ${
          active === "all"
            ? "bg-white/80 backdrop-blur-md shadow text-gray-800"
            : "bg-white/40 backdrop-blur-md text-gray-700 hover:bg-white/60"
        }`}
      >
        All Rooms
      </button>

      <button
        onClick={() => handleClick("available")}
        className={`px-4 py-2 rounded-lg font-medium transition ${
          active === "available"
            ? "bg-blue-600 text-white shadow"
            : "bg-white/40 backdrop-blur-md text-gray-700 hover:bg-white/60"
        }`}
      >
        Available Rooms
      </button>

    </div>
  );
};

export default RoomsFilter;