// src/hooks/useUsers.ts
import { useState, useEffect } from 'react';
import { fetchUsers, addUser, addCoffee } from '../services/userService';

export type User = {
  name: string;
  owes: Record<string, number>;
};

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userName, setUserName] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedReceiver, setSelectedReceiver] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      const users = await fetchUsers();
      setUsers(users);
    };

    getUsers();
  }, []);

  const handleAddUser = async () => {
    await addUser(userName);
    setUserName('');
    const users = await fetchUsers();
    setUsers(users);
  };

  const handleAddCoffee = async () => {
    await addCoffee(selectedUser, selectedReceiver);
    const users = await fetchUsers();
    setUsers(users);
  };

  return {
    users,
    userName,
    setUserName,
    selectedUser,
    setSelectedUser,
    selectedReceiver,
    setSelectedReceiver,
    handleAddUser,
    handleAddCoffee,
  };
};
