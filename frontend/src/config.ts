// src/config.ts

export const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://l6xe0morxf.execute-api.eu-central-1.amazonaws.com/default/aws-coffee-management-system-backend-lambda/api'
  : 'http://localhost:5000/api';
