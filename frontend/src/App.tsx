import React, { useState, useEffect } from "react";
import { Container, Spinner, Center } from "@chakra-ui/react";
import { useUsers } from "./hooks/useUsers";
import { useLogs } from "./hooks/useLogs";
import UserForm from "./components/UserForm";
import CoffeeForm from "./components/CoffeeForm";
import UserList from "./components/UserList";
import Accordion from "./components/Accordion";
import Log from "./components/Log";
import Login from "./components/Login";
import { isAuthenticated } from "./services/authService";
import Layout from "./Layout";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    fetchUsers,
  } = useUsers();

  const { logs, fetchLogs } = useLogs();

  useEffect(() => {
    const checkAuth = async () => {
      if (await isAuthenticated()) {
        setIsLoggedIn(true);
        await fetchUsers();
        await fetchLogs();
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLoginSuccess = async () => {
    setIsLoggedIn(true);
    await fetchUsers();
    await fetchLogs();
  };

  if (isLoading) {
    return (
      <Container maxW="container.md" p={4} mb={20}>
        <Center height="100vh">
          <Spinner size="xl" />
        </Center>
      </Container>
    );
  }

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <Layout>
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
    </Layout>
  );
};

export default App;
