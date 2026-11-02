import axios from "axios";

const BACKEND_BASE = "http://localhost:5000/api"; // change later if needed

const axiosClient = axios.create({
  baseURL: BACKEND_BASE,
});

// Attach token automatically
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
