// src/services/authService.ts
import api from './api';

export const login = async (password: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await api.post('/auth/login', { password });
    const { token } = response.data;
    localStorage.setItem('authToken', token);
    return { success: response.status === 200 };
  } catch (error: any) {
    if (error.response) {
      // Server responded with a status other than 200
      if (error.response.status === 401) {
        return { success: false, error: 'Invalid password' };
      }
      if (error.response.status === 503) {
        return { success: false, error: 'Could not establish a connection to the server' };
      }
    } else {
      // Server did not respond or other network error
      return { success: false, error: 'Could not establish a connection to the server' };
    }
    console.error(error);
    return { success: false, error: 'An unexpected error occurred' };
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
