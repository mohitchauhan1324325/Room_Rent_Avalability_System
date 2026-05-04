import { Link } from "react-router-dom";

const RegisterForm = ({ handleChange, handleRegister }) => {
  return (
    <div className="w-full max-w-sm mx-auto">

      <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <select
          name="role"
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="user">User</option>
          <option value="owner">Owner</option>
        </select>

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition duration-200 font-medium"
        >
          Register
        </button>

        <p className="text-center mt-3 text-sm text-gray-600">
          Already registered?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
};

export default RegisterForm;