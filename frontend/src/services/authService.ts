import axios from 'axios';

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

export const isAuthenticated = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/check`);
      return response.status === 200;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
