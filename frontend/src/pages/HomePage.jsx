import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 text-center">

      <div className="text-white max-w-2xl">

        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Find Your Perfect Room
        </h1>

        <p className="text-lg md:text-xl mb-8 text-gray-200">
          Comfortable, affordable, and hassle-free stays at your fingertips.
        </p>

        {/* Glass Search / Action Box */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 md:p-6 flex flex-col md:flex-row gap-3 items-center justify-center shadow-lg">

          <input
            type="text"
            placeholder="Search by location..."
            className="w-full md:flex-1 px-4 py-2 rounded-lg outline-none text-gray-700"
          />

          <button
            onClick={() => navigate("/Rooms")}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            Explore Rooms
          </button>

        </div>

      </div>
    </div>
  );
};

export default HomePage;