import { useState, useEffect } from 'react';
import { fetchUsers as fetchUsersService, addUser, addCoffee } from '../services/userService';

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

  const fetchUsers = async () => {
    try {
      const users = await fetchUsersService();
      const computedUsers = computeUserData(users);
      setUsers(computedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (fetchLogs: () => void): Promise<boolean> => {
    try {
      await addUser(userName);
      setUserName('');
      await fetchUsers();
      fetchLogs(); // Fetch logs after adding user
      return true;
    } catch (error) {
      console.error('Error adding user:', error);
      return false;
    }
  };

  const handleAddCoffee = async (fetchLogs: () => void): Promise<boolean> => {
    try {
      await addCoffee(selectedUser, selectedReceiver);
      await fetchUsers();
      fetchLogs(); // Fetch logs after adding coffee
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
    fetchUsers, 
  };
};
