import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-4 md:px-8 py-3 flex items-center justify-between shadow-md">
      
      {/* Left: Logo + Brand */}
      <div className="flex items-center gap-3">
        <img
          src="transparent-logo.png"
          alt="logo"
          className="w-12 h-12 object-contain"
        />
        <h1 className="text-xl font-bold tracking-wide">StayNest</h1>
      </div>

      {/* Right: Links */}
      <div className="flex items-center gap-6 text-sm md:text-base">
        <Link
          to="/"
          className="hover:text-gray-300 transition duration-200"
        >
          Home
        </Link>

        <Link
          to="/rooms"
          className="hover:text-gray-300 transition duration-200"
        >
          Rooms
        </Link>

        <Link
          to="/AddRooms"
          className="hover:text-gray-300 transition duration-200"
        >
          Add Room
        </Link>

        <Link
          to="/ManageBookings"
          className="hover:text-gray-300 transition duration-200"
        >
          Booking
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;