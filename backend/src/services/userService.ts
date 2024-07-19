// src/services/userService.ts
import { User } from '../models/user';

const users: User[] = [];

export const getUsers = (): User[] => {
  return users;
};

export const addUser = (name: string): User | null => {
  if (users.find(user => user.name === name)) {
    return null;
  }
  const newUser: User = { name, owes: {} };
  users.push(newUser);
  return newUser;
};

export const addCoffee = (buyer: string, receiver: string): boolean => {
  const buyerUser = users.find(user => user.name === buyer);
  const receiverUser = users.find(user => user.name === receiver);

  if (!buyerUser || !receiverUser) {
    return false;
  }

  if (!buyerUser.owes[receiver]) {
    buyerUser.owes[receiver] = 0;
  }
  buyerUser.owes[receiver] += 1;

  return true;
};
