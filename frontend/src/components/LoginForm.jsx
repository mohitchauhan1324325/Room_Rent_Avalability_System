const LoginForm = ({ handleChange, handleLogin }) => {
  return (
    <div className="w-full max-w-sm mx-auto">

      <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200 font-medium"
        >
          Login
        </button>

      </div>

    </div>
  );
};

export default LoginForm;