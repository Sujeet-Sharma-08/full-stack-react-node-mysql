import axios from "axios";

const apiConnector = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error = null) => {
//   failedQueue.forEach(promise => {
//     if (error) {
//       promise.reject(error);
//     } else {
//       promise.resolve();
//     }
//   });
//   failedQueue = [];
// };

// apiConnector.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;

//     // 🚫 Never intercept refresh endpoint
//     if (originalRequest?.url?.includes("/auth/refresh-token")) {
//       return Promise.reject(error);
//     }

//     // Handle only 401 errors
//     if (error.response?.status === 401) {
//       // 🚫 Prevent infinite retry
//       if (originalRequest._retry) {
//         window.location.href = "/login";
//         return Promise.reject(error);
//       }

//       // 🔁 If refresh already running, queue request
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then(() => apiConnector(originalRequest));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         await apiConnector.post("/auth/refresh-token");
//         processQueue();
//         return apiConnector(originalRequest);
//       } catch (refreshError) {
//         processQueue(refreshError);
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default apiConnector;
