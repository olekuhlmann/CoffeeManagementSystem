// src/services/logService.ts
import axios from 'axios';
import { API_URL } from '../config';
import { LogEntry } from '../types/logEntry';

export const fetchLogs = async (): Promise<LogEntry[]> => {
  try {
    const response = await axios.get(`${API_URL}/logs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching logs:', error);
    throw error;
  }
};
