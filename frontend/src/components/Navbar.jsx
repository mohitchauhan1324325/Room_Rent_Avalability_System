import { Link, useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated, logout, getUserRole } from "../utils/auth";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const { darkMode, setDarkMode } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const syncAuth = () => {
      const authStatus = isAuthenticated();
      setLoggedIn(authStatus);
      setRole(authStatus ? getUserRole() : null);
    };

    syncAuth();
    window.addEventListener("storage", syncAuth);
    window.addEventListener("auth:changed", syncAuth);
    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("auth:changed", syncAuth);
    };
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    setRole(null);
    window.dispatchEvent(new Event("auth:changed"));
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;
  
  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className={`relative px-3 py-2 rounded-lg font-medium transition-all duration-300
        ${isActive(to) 
          ? "text-brand-600 dark:text-brand-500 bg-brand-50 dark:bg-brand-900/30" 
          : "hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
    >
      {children}
    </Link>
  );

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'pt-2 px-4' : 'pt-4 px-4 md:px-8'}`}>
      <div
        className={`
          max-w-7xl mx-auto glass rounded-2xl transition-all duration-300
          ${scrolled ? 'py-3 px-4 md:px-6 shadow-2xl' : 'py-4 px-6 md:px-8'}
        `}
      >
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-brand-500 text-white p-2 rounded-xl shadow-lg group-hover:scale-105 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
              StayNest
            </h1>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/rooms">Rooms</NavLink>

            {role === "user" && (
              <>
                <NavLink to="/UserBooking">My Bookings</NavLink>
                <NavLink to="/favorite">Favorites</NavLink>
              </>
            )}

            {role === "owner" && (
              <>
                <NavLink to="/AddRooms">Add Room</NavLink>
                <NavLink to="/my-rooms">My Rooms</NavLink>
              </>
            )}

            {role === "admin" && (
              <>
                <NavLink to="/AddRooms">Add Room</NavLink>
                <NavLink to="/admin">Admin Panel</NavLink>
              </>
            )}

            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
              )}
            </button>

            {!loggedIn ? (
              <div className="flex gap-3 ml-2">
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 rounded-xl font-medium bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-500/30 transition-all hover:-translate-y-0.5"
                >
                  Register
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="ml-2 px-5 py-2 rounded-xl font-medium bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 transition-all hover:-translate-y-0.5"
              >
                Logout
              </button>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d={isOpen ? "M6 18 18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"} />
            </svg>
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-2"
            >
              <NavLink to="/">Home</NavLink>
              <NavLink to="/rooms">Rooms</NavLink>

              {role === "user" && (
                <>
                  <NavLink to="/UserBooking">My Bookings</NavLink>
                  <NavLink to="/favorite">Favorites</NavLink>
                </>
              )}

              {role === "owner" && (
                <>
                  <NavLink to="/AddRooms">Add Room</NavLink>
                  <NavLink to="/my-rooms">My Rooms</NavLink>
                </>
              )}

              {role === "admin" && (
                <>
                  <NavLink to="/AddRooms">Add Room</NavLink>
                  <NavLink to="/admin">Admin Panel</NavLink>
                </>
              )}

              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800"
                >
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </button>

                {!loggedIn ? (
                  <div className="flex gap-2">
                    <Link to="/login" className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700">Login</Link>
                    <Link to="/register" className="px-4 py-2 rounded-lg bg-brand-600 text-white">Register</Link>
                  </div>
                ) : (
                  <button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-red-500 text-white">
                    Logout
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;