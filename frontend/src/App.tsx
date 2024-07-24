import React from "react";
import { Box, Container, VStack } from "@chakra-ui/react";
import { useUsers } from "./hooks/useUsers";
import { useLogs } from "./hooks/useLogs";
import UserForm from "./components/UserForm";
import CoffeeForm from "./components/CoffeeForm";
import UserList from "./components/UserList";
import MainHeading from "./components/MainHeading";
import Accordion from "./components/Accordion";
import CoffeeIcon from "./components/CoffeeIcon";
import Log from "./components/Log";

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

  const { logs, fetchLogs } = useLogs();

  return (
    <Container maxW="container.md" p={4} mb={20}>
      <Box textAlign="center" fontSize="xl">
        <MainHeading>
          Coffee Management System (CMS) <CoffeeIcon />
        </MainHeading>
        <VStack spacing={4} mt={10}>
          <CoffeeForm
            users={users}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            selectedReceiver={selectedReceiver}
            setSelectedReceiver={setSelectedReceiver}
            handleAddCoffee={() => handleAddCoffee(fetchLogs)}
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
                    handleAddUser={() => handleAddUser(fetchLogs)}
                  />
                ),
              },
              { label: "Logs", content: <Log logs={logs} /> },
            ]}
          />
        </VStack>
      </Box>
    </Container>
  );
};

export default App;
