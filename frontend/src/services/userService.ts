// src/services/userService.ts
import axios from 'axios';
import { API_URL } from '../config';

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addUser = async (name: string) => {
  try {
    const response = await axios.post(`${API_URL}/users`, { name });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addCoffee = async (buyer: string, receiver: string) => {
  try {
    const response = await axios.post(`${API_URL}/coffees`, { buyer, receiver });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
