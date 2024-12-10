import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000", // Base URL backend
    timeout: 5000, // Timeout optional
});

export default api;
