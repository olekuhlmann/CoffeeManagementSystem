// src/services/userService.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const addUser = async (name: string) => {
  const response = await axios.post(`${API_URL}/users`, { name });
  return response.data;
};

export const addCoffee = async (buyer: string, receiver: string) => {
  const response = await axios.post(`${API_URL}/coffees`, { buyer, receiver });
  return response.data;
};
