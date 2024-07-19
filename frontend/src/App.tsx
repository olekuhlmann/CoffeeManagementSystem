import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ChakraProvider,
  Box,
  Heading,
  VStack,
  Input,
  Button,
  Select,
} from '@chakra-ui/react';

type User = {
  name: string;
  owes: Record<string, number>;
};

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userName, setUserName] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedReceiver, setSelectedReceiver] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:5000/users');
    setUsers(response.data);
  };

  const addUser = async () => {
    await axios.post('http://localhost:5000/users', { name: userName });
    setUserName('');
    fetchUsers();
  };

  const addCoffee = async () => {
    await axios.post('http://localhost:5000/coffees', {
      buyer: selectedUser,
      receiver: selectedReceiver,
    });
    fetchUsers();
  };

  return (
    <ChakraProvider>
      <Box textAlign="center" fontSize="xl">
        <Heading>Welcome to Coffee Management System</Heading>
        <VStack spacing={4} mt={10}>
          <Box>
            <Input
              placeholder="Add a new user"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Button onClick={addUser} ml={2}>
              Add User
            </Button>
          </Box>
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
            <Button onClick={addCoffee} ml={2}>
              Add Coffee
            </Button>
          </Box>
          <Box>
            {users.map((user) => (
              <Box key={user.name} borderWidth="1px" p={4} borderRadius="md">
                <Heading size="md">{user.name}</Heading>
                {Object.entries(user.owes).map(([name, count]) => (
                  <Box key={name}>
                    {name}: {count} coffee(s)
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default App;
