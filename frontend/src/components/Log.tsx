import React, { useState, useEffect } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { LogEntry } from '../types/logEntry';
import InfiniteScroll from 'react-infinite-scroll-component';

type LogProps = {
  logs: LogEntry[];
};

const Log: React.FC<LogProps> = ({ logs }) => {
  const [visibleLogs, setVisibleLogs] = useState<LogEntry[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    setVisibleLogs(logs.slice(0, 10));
    setHasMore(logs.length > 10);
  }, [logs]);

  const fetchMoreLogs = () => {
    const nextLogs = logs.slice(visibleLogs.length, visibleLogs.length + 10);
    setVisibleLogs((prevLogs) => [...prevLogs, ...nextLogs]);
    setHasMore(nextLogs.length > 0);
  };

  return (
    <InfiniteScroll
      dataLength={visibleLogs.length}
      next={fetchMoreLogs}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      <VStack align="start" spacing={2}>
        {visibleLogs.map((log) => (
          <Box key={log.id} p={2} borderWidth="1px" borderRadius="md" width="100%">
            <Text>{log.message}</Text>
            <Text fontSize="sm" color="gray.500">{new Date(log.createdAt).toLocaleString('en-GB')}</Text>
          </Box>
        ))}
      </VStack>
    </InfiniteScroll>
  );
};

export default Log;
