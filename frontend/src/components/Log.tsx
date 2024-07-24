import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { LogEntry } from '../types/logEntry';


type LogProps = {
  logs: LogEntry[];
};

const Log: React.FC<LogProps> = ({ logs }) => {
  return (
    <VStack align="start" spacing={2}>
      {logs.map((log) => (
        <Box key={log.id} p={2} borderWidth="1px" borderRadius="md" width="100%">
          <Text>{log.message}</Text>
          <Text fontSize="sm" color="gray.500">{new Date(log.createdAt).toLocaleString()}</Text>
        </Box>
      ))}
    </VStack>
  );
};

export default Log;
