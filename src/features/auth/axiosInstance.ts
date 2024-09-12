import axios from 'axios';
import { refreshAccessToken } from './authApi'; // Import the refresh token function




const api = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newAccessToken = await refreshAccessToken();
          api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('token');
          window.location.href = '/admin/login'; // Adjust based on your routing
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
  

export default api;
