// src/services/logService.ts
import api from './api';
import { LogEntry } from '../types/logEntry';

export const fetchLogs = async (): Promise<LogEntry[]> => {
  try {
    const response = await api.get('/logs');
    return response.data;
  } catch (error) {
    console.error('Error fetching logs:', error);
    throw error;
  }
};
