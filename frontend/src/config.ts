// src/config.ts

export const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://coffee-management-system-8c4f537c6eab.herokuapp.com/api'
  : 'http://localhost:5000/api';
