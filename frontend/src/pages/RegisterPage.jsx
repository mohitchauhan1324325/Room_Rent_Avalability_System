import { useState } from "react";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        try {
            setLoading(true);
            const data = await registerUser(form);
            toast.success(data.message || "Registered successfully");

            navigate("/login");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

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
    );
};

export default RegisterPage;