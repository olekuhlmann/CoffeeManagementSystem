// src/services/userService.ts
import User from '../models/user';

export const getUsers = async () => {
  return await User.findAll();
};

export const addUser = async (name: string) => {
  if (await User.findByPk(name)) {
    return null;
  }
  return await User.create({ name, owes: {} });
};

export const addCoffee = async (buyer: string, receiver: string) => {
  const buyerUser = await User.findByPk(buyer);
  const receiverUser = await User.findByPk(receiver);

  if (!buyerUser || !receiverUser) {
    return false;
  }

  const owes = buyerUser.owes;
  owes[receiver] = (owes[receiver] || 0) + 1;
  await buyerUser.update({ owes });

  return true;
};
