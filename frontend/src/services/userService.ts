// src/services/userService.ts
import api from './api';

export const fetchUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addUser = async (name: string) => {
  try {
    const response = await api.post('/users', { name });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addCoffee = async (buyer: string, receiver: string) => {
  try {
    const response = await api.post('/coffees', { buyer, receiver });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
