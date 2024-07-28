// src/hooks/useLogs.ts
import { useState, useEffect } from 'react';
import { fetchLogs as fetchLogsService } from '../services/logService';
import { LogEntry } from '../types/logEntry';

export const useLogs = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const fetchLogs = async () => {
    try {
      const logs = await fetchLogsService();
      setLogs(logs);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return { logs, fetchLogs };
};
