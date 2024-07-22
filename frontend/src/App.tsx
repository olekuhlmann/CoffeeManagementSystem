// src/App.tsx
import React from 'react';
import { ChakraProvider, Box, Heading, VStack } from '@chakra-ui/react';
import { useUsers } from './hooks/useUsers';
import UserForm from './components/UserForm';
import CoffeeForm from './components/CoffeeForm';
import UserList from './components/UserList';
import MainHeading from './components/MainHeading';

const App: React.FC = () => {
  const {
    users,
    userName,
    setUserName,
    selectedUser,
    setSelectedUser,
    selectedReceiver,
    setSelectedReceiver,
    handleAddUser,
    handleAddCoffee,
  } = useUsers();

  return (
      <Box textAlign="center" fontSize="xl">
        <MainHeading>Coffee Management System (CMS)</MainHeading>
        <VStack spacing={4} mt={10}>
          <UserForm userName={userName} setUserName={setUserName} handleAddUser={handleAddUser} />
          <CoffeeForm
            users={users}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            selectedReceiver={selectedReceiver}
            setSelectedReceiver={setSelectedReceiver}
            handleAddCoffee={handleAddCoffee}
          />
          <UserList users={users} />
        </VStack>
      </Box>
  );
};

export default App;
