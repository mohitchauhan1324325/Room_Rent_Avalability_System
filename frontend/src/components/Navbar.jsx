import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">

            <h1 className="text-xl font-bold">StayNest</h1>
            <p>Smart Room Availability & Rent Booking Platform</p>
            <div className="flex gap-6">
                {/* <Link to="/" className="hover:text-gray-300">Home</Link> */}
                <Link to="/" className="hover:text-gray-300">Rooms </Link>
                <Link to="/AddRooms" className="hover:text-gray-300">Add Room</Link>
                <Link to="/ManageBookings" className="hover:text-gray-300">Booking</Link>
            </div>

        </nav>
    );
};

export default Navbar;