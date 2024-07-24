import React from 'react';
import {
  Box,
  Heading,
  Stack,
  StackDivider,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { User } from '../hooks/useUsers';

type UserListProps = {
  users: User[];
};

const UserList: React.FC<UserListProps> = ({ users }) => (
  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} width="100%">
    {users.map((user) => (
      <Box key={user.name} borderWidth="1px" p={4} borderRadius="md" shadow="md">
        <Heading size="md" mb={4}>{user.name}</Heading>
        <Stack divider={<StackDivider />} spacing={4}>
          <Box>
            <Heading size="sm" color="red.500">Owes:</Heading>
            {(user.owes && user.owes.length > 0) ? (
              user.owes.map(({ name, count }) => (
                <Text key={name}>
                    {name} {count}x ☕
                </Text>
              ))
            ) : (
              <Text>{user.name} owes no coffees</Text>
            )}
          </Box>
          <Box>
            <Heading size="sm" color="green.500">Is Owed:</Heading>
            {(user.isOwed && user.isOwed.length > 0) ? (
              user.isOwed.map(({ name, count }) => (
                <Text key={name}>
                  {count}x ☕ by {name}
                </Text>
              ))
            ) : (
              <Text>{user.name} is owed no coffees</Text>
            )}
          </Box>
        </Stack>
      </Box>
    ))}
  </SimpleGrid>
);

export default UserList;
