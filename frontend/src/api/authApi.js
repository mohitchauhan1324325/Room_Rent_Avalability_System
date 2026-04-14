import api from "../utils/api";

export const registerUser = async (data) => {
    try {
        const res = await api.post("/api/register", data);
        return res.data;

    } catch (error) {
        throw error.response?.data || { message: "Register failed" };
    }
};

export const loginUser = async (data) => {
  try {
    const res = await api.post("/api/login", data);

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }
    
    if (res.data.user) {
      localStorage.setItem("user", JSON.stringify(res.data.user));
    }

    return res.data;

  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};
