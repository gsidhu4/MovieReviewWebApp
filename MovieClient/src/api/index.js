import axiosInstance from './axiosConfig';

export const signup = async (userData) => {
  const response = await axiosInstance.post('/signup', userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axiosInstance.post('/login', userData);
  return response.data;
};
