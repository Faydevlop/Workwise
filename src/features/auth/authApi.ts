import api from './axiosInstance';

export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await api.post('/refresh-token', { refreshToken }); // Send refresh token in the body

    const newAccessToken = response.data.accessToken;
    localStorage.setItem('token', newAccessToken); // Update the access token in localStorage
    return newAccessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};
