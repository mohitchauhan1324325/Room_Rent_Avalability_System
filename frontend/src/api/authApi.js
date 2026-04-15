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

    const { token, user } = res.data;
  
    if (token && user){
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }

    return res.data;

  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};
