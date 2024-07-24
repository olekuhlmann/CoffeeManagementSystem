import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:5000/api';

axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

export const login = async (password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { password });
    return response.status === 200;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const isAuthenticated = () => {
  const token = Cookies.get('authToken');
  return !!token;
};
