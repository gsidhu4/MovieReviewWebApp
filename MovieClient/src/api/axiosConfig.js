import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 
    "ngrok-skip-browser-warning": "true",
    "Content-Type": "application/json"
  }
});

// Function to set the Authorization header
export const setAuthHeader = (token) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const login = async (data) => {
  const response = await axiosInstance.post('/auth/login', data);
  return response.data;
};

export const signup = async (data) => {
  const response = await axiosInstance.post('/auth/signup', data);
  return response.data;
};

export default axiosInstance;
