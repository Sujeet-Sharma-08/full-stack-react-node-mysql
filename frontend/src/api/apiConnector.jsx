import axios from "axios";

const apiConnector = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000",  // backend localhost
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

export default apiConnector;
