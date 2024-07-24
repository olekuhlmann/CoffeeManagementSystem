import { useState, useEffect } from 'react';
import axios from 'axios';
import { LogEntry } from '../types/logEntry';

export const useLogs = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const fetchLogs = async () => {
    const response = await axios.get('http://localhost:5000/api/logs');
    setLogs(response.data);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return { logs, fetchLogs };
};
