import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:import.meta.env.VITE_BASE_URL,
});

// Intercept requests to include the token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // console.log("✅ Token attached:", token);
  } else {
    console.warn("❌ No token found in localStorage");
  }
  return config;
});


export default axiosInstance;
