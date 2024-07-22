// src/components/UserList.tsx
import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { User } from '../hooks/useUsers';

type UserListProps = {
  users: User[];
};

const UserList: React.FC<UserListProps> = ({ users }) => (
  <Box>
    {users.map((user) => (
      <Box key={user.name} borderWidth="1px" p={4} borderRadius="md">
        <Heading size="md">{user.name}</Heading>
        <Box>
          <Heading size="sm">Owes:</Heading>
          {(user.owes || []).map(({ name, count }) => (
            <Box key={name}>
              {name}: {count} coffee(s)
            </Box>
          ))}
        </Box>
        <Box>
          <Heading size="sm">Is Owed:</Heading>
          {(user.isOwed || []).map(({ name, count }) => (
            <Box key={name}>
              {name}: {count} coffee(s)
            </Box>
          ))}
        </Box>
      </Box>
    ))}
  </Box>
);

export default UserList;
