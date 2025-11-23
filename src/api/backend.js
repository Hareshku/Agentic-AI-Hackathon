import axios from "axios";

const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const backend = axios.create({
  baseURL: apiBase,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

backend.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error("API error", error?.response || error?.message);
    throw error;
  }
);

export default backend;
