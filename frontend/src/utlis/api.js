import axios from "axios";

const API_URL = (process.env.REACT_APP_API_URL || "http://localhost:5000").replace(
  /\/$/,
  ""
);

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signup: (data) => api.post("/api/signup", data),
  signin: (data) => api.post("/api/signin", data),
  getProfile: () => api.get("/api/profile"),
  updateProfile: (data) => api.put("/api/profile", data),
};

export const paymentAPI = {
  getKey: () => api.get("/api/razorpay-key"),
  createOrder: (amount) => api.post("/api/create-order", { amount }),
  verifyPayment: (data) => api.post("/api/verify-payment", data),
};

export default api;
