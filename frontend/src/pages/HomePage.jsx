import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      
      <div className="bg-white shadow-lg rounded-2xl p-8 md:p-12 text-center max-w-xl w-full">
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Welcome to StayNest
        </h1>

        <p className="text-gray-600 mb-6">
          Find and book the perfect room easily. Comfortable, affordable, and
          hassle-free stays at your fingertips.
        </p>

        <button
          onClick={() => navigate("/Rooms")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition duration-200"
        >
          See Rooms
        </button>

      </div>
    </div>
  );
};

export default HomePage;