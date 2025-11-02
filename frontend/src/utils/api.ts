import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Ensure headers exists
  config.headers = config.headers ?? {};

  // Only add Authorization if not an auth endpoint
  if (token && !config.url?.includes("/auth/")) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default api;