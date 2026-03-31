import axios from "axios";

const api = axios.create({
    baseURL: "https://backend-api-zh95.onrender.com/",   
});

export default api;