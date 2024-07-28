// src/services/authService.ts
import api from './api';

export const login = async (password: string) => {
  try {
    const response = await api.post('/auth/login', { password });
    const { token } = response.data;
    localStorage.setItem('authToken', token);
    return response.status === 200;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const isAuthenticated = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) return false;

  try {
    const response = await api.get('/auth/check');
    return response.status === 200;
  } catch (error) {
    console.error(error);
    return false;
  }
};
