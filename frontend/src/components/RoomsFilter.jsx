import { useState } from "react";

const RoomsFilter = ({ setFilter }) => {

  const [active, setActive] = useState("all");

  const handleClick = (type) => {
    setActive(type);
    setFilter(type);
  };

  return (

    <div className="mb-6 flex flex-wrap gap-3">

      {/* ALL */}
      <button
        onClick={() => handleClick("all")}
        className={`
          px-4 py-2 rounded-lg font-medium transition duration-200
          border
          ${
            active === "all"
              ? `
                bg-white dark:bg-gray-800
                text-gray-800 dark:text-white
                border-gray-200 dark:border-gray-700
                shadow-lg
              `
              : `
                bg-white/40 dark:bg-gray-900/40
                backdrop-blur-md
                text-gray-700 dark:text-gray-300
                border-gray-200 dark:border-gray-700
                hover:bg-white/70 dark:hover:bg-gray-800/70
              `
          }
        `}
      >
        All Rooms
      </button>

      {/* AVAILABLE */}
      <button
        onClick={() => handleClick("available")}
        className={`
          px-4 py-2 rounded-lg font-medium transition duration-200
          border
          ${
            active === "available"
              ? `
                bg-blue-600 text-white
                border-blue-600
                shadow-lg
              `
              : `
                bg-white/40 dark:bg-gray-900/40
                backdrop-blur-md
                text-gray-700 dark:text-gray-300
                border-gray-200 dark:border-gray-700
                hover:bg-white/70 dark:hover:bg-gray-800/70
              `
          }
        `}
      >
        Available Rooms
      </button>

    </div>
  );
};

export default RoomsFilter;