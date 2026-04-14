import { Link } from "react-router-dom";
const RegisterForm = ({ handleChange, handleRegister }) => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-xl shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Register
                </h2>

                <input
                    className="border p-2 w-full mb-3"
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                />

                <input
                    className="border p-2 w-full mb-3"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input
                    className="border p-2 w-full mb-3"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    className="border p-2 w-full mb-3"
                />

                <button
                    className="bg-green-500 text-white w-full p-2 rounded"
                    onClick={handleRegister}
                >
                    Register
                </button>

                <p className="text-center mt-3 text-sm text-gray-600">
                    Already registered?{" "}
                    <Link to="/login" className="text-blue-600 font-medium hover:underline">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default RegisterForm
