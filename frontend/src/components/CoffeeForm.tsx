// src/components/CoffeeForm.tsx
import React from 'react';
import { Box, Select, Button } from '@chakra-ui/react';
import { User } from '../hooks/useUsers';

type CoffeeFormProps = {
  users: User[];
  selectedUser: string;
  setSelectedUser: (name: string) => void;
  selectedReceiver: string;
  setSelectedReceiver: (name: string) => void;
  handleAddCoffee: () => void;
};

const CoffeeForm: React.FC<CoffeeFormProps> = ({
  users,
  selectedUser,
  setSelectedUser,
  selectedReceiver,
  setSelectedReceiver,
  handleAddCoffee,
}) => (
  <Box>
    <Select
      placeholder="Select your name"
      value={selectedUser}
      onChange={(e) => setSelectedUser(e.target.value)}
    >
      {users.map((user) => (
        <option key={user.name} value={user.name}>
          {user.name}
        </option>
      ))}
    </Select>
    <Select
      placeholder="Select who you bought coffee for"
      value={selectedReceiver}
      onChange={(e) => setSelectedReceiver(e.target.value)}
    >
      {users.map((user) => (
        <option key={user.name} value={user.name}>
          {user.name}
        </option>
      ))}
    </Select>
    <Button onClick={handleAddCoffee} ml={2}>
      Add Coffee
    </Button>
  </Box>
);

export default CoffeeForm;
