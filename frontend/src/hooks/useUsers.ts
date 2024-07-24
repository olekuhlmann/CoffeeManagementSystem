// src/hooks/useUsers.ts
import { useState, useEffect } from 'react';
import { fetchUsers, addUser, addCoffee } from '../services/userService';

export type CoffeeTransaction = {
  sender: string;
  receiver: string;
  count: number;
};

export type User = {
  name: string;
  sentCoffees: { receiver: string; count: number }[];
  receivedCoffees: { sender: string; count: number }[];
  owes: { name: string; count: number }[];
  isOwed: { name: string; count: number }[];
};

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userName, setUserName] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedReceiver, setSelectedReceiver] = useState('');

  const computeUserData = (users: User[]) => {
    return users.map((user: User) => {
      const owes: { name: string; count: number }[] = [];
      const isOwed: { name: string; count: number }[] = [];

      const owedMap = new Map<string, number>();

      user.sentCoffees.forEach(coffee => {
        if (owedMap.has(coffee.receiver)) {
          owedMap.set(coffee.receiver, owedMap.get(coffee.receiver)! + coffee.count);
        } else {
          owedMap.set(coffee.receiver, coffee.count);
        }
      });

      user.receivedCoffees.forEach(coffee => {
        if (owedMap.has(coffee.sender)) {
          owedMap.set(coffee.sender, owedMap.get(coffee.sender)! - coffee.count);
        } else {
          owedMap.set(coffee.sender, -coffee.count);
        }
      });

      owedMap.forEach((count, name) => {
        if (count > 0) {
          isOwed.push({ name, count });
        } else if (count < 0) {
          owes.push({ name, count: -count });
        }
      });

      return { ...user, owes: owes || [], isOwed: isOwed || [] };
    });
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await fetchUsers();
        const computedUsers = computeUserData(users);
        setUsers(computedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getUsers();
  }, []);

  const handleAddUser = async (): Promise<boolean> => {
    try {
      await addUser(userName);
      setUserName('');
      const users = await fetchUsers();
      const computedUsers = computeUserData(users);
      setUsers(computedUsers);
      return true;
    } catch (error) {
      console.error('Error adding user:', error);
      return false;
    }
  };

  const handleAddCoffee = async (): Promise<boolean> => {
    try {
      await addCoffee(selectedUser, selectedReceiver);
      const users = await fetchUsers();
      const computedUsers = computeUserData(users);
      setUsers(computedUsers);
      return true;
    } catch (error) {
      console.error('Error adding coffee:', error);
      return false;
    }
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
