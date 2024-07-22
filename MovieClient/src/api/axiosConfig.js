import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { "ngrok-skip-browser-warning": "true" }
});

// Function to set the Authorization header
export const setAuthHeader = (token) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default axiosInstance;
