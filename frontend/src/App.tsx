// src/App.tsx
import React from "react";
import { Box, Container, VStack } from "@chakra-ui/react";
import { useUsers } from "./hooks/useUsers";
import UserForm from "./components/UserForm";
import CoffeeForm from "./components/CoffeeForm";
import UserList from "./components/UserList";
import MainHeading from "./components/MainHeading";
import Accordion from "./components/Accordion";
import CoffeeIcon from "./components/CoffeeIcon";

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
    <Container maxW="container.md" p={4} mb={20}>
      <Box textAlign="center" fontSize="xl">
        <MainHeading>Coffee Management System (CMS) <CoffeeIcon/></MainHeading>
        <VStack spacing={4} mt={10}>
          <CoffeeForm
            users={users}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            selectedReceiver={selectedReceiver}
            setSelectedReceiver={setSelectedReceiver}
            handleAddCoffee={handleAddCoffee}
          />
          <UserList users={users} />
          <Accordion
            items={[
              {
                label: "Add User",
                content: (
                  <UserForm
                    userName={userName}
                    setUserName={setUserName}
                    handleAddUser={handleAddUser}
                  />
                ),
              },
            ]}
          />
        </VStack>
      </Box>
    </Container>
  );
};

export default App;
