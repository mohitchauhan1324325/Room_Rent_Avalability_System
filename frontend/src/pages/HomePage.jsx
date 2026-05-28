import { useNavigate } from "react-router-dom";

const HomePage = () => {

  const navigate = useNavigate();

  return (

    <div
      className="
        flex items-center justify-center
        min-h-[80vh]
        px-4 text-center
      "
    >

      <div className="max-w-2xl">

        {/* HEADING */}
        <h1
          className="
            text-4xl md:text-6xl
            font-bold mb-4
            leading-tight
            text-white
            drop-shadow-lg
          "
        >
          Find Your Perfect Room
        </h1>

        {/* SUBTITLE */}
        <p
          className="
            text-lg md:text-xl
            mb-8
            text-gray-200 dark:text-gray-300
          "
        >
          Comfortable, affordable, and hassle-free stays at your fingertips.
        </p>

        {/* SEARCH BOX */}
        <div
          className="
            bg-white/80 dark:bg-gray-900/80
            backdrop-blur-md
            border border-gray-200 dark:border-gray-700
            rounded-2xl
            p-4 md:p-6
            flex flex-col md:flex-row
            gap-3
            items-center justify-center
            shadow-2xl
          "
        >

          {/* INPUT */}
          <input
            type="text"
            placeholder="Search by location..."
            className="
              w-full md:flex-1
              px-4 py-3
              rounded-xl
              outline-none
              border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-800
              text-gray-800 dark:text-white
              placeholder:text-gray-500 dark:placeholder:text-gray-400
              focus:ring-2 focus:ring-blue-500
            "
          />

          {/* BUTTON */}
          <button
            onClick={() => navigate("/Rooms")}
            className="
              w-full md:w-auto
              bg-blue-600 hover:bg-blue-700
              text-white
              px-6 py-3
              rounded-xl
              font-medium
              transition duration-200
              shadow-lg
            "
          >
            Explore Rooms
          </button>

        </div>

      </div>

    </div>
  );
};

export default HomePage;