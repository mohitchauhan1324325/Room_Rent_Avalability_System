import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const RegisterForm = ({ handleChange, handleRegister }) => {
  return (
    <div className="w-full max-w-sm mx-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900 dark:text-white">
          Create Account
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account Type</label>
            <select
              name="role"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow appearance-none"
            >
              <option value="user">User</option>
              <option value="owner">Owner</option>
            </select>
          </div>

          <button
            onClick={handleRegister}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white py-3 mt-2 rounded-xl font-bold transition duration-200 shadow-lg shadow-brand-500/30 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Register
          </button>
        </div>

        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-300">
          Already registered?{" "}
          <Link
            to="/login"
            className="text-brand-600 dark:text-brand-400 font-bold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterForm;