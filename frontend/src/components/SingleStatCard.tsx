import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

export type SingleStatCardProps = {
  title: string;
  stat: number | string;
  description?: string;
};

export const SingleStatCard: React.FC<SingleStatCardProps> = ({
  title,
  stat,
  description,
}) => {
  return (
    <Box borderWidth="1px" p={4} borderRadius="md" shadow="md" width="100%">
      <Heading size="md" mb={2}>
        {title}
      </Heading>
      <Heading size="xl" mb={2}>
        {stat}
      </Heading>
      {description && (
        <Text fontSize="sm" color="gray.500">
          {description}
        </Text>
      )}
    </Box>
  );
};
