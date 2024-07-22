// src/services/userService.ts
import { User, CoffeeCount } from '../database';

export const getUsers = async () => {
  const users = await User.findAll({
    include: [
      {
        model: CoffeeCount,
        as: 'sentCoffees',
        attributes: ['receiver', 'count'],
      },
      {
        model: CoffeeCount,
        as: 'receivedCoffees',
        attributes: ['sender', 'count'],
      },
    ],
  });

  return users.map(user => ({
    name: user.name,
    sentCoffees: user.sentCoffees?.map(coffee => ({
      receiver: coffee.receiver,
      count: coffee.count,
    })) || [],
    receivedCoffees: user.receivedCoffees?.map(coffee => ({
      sender: coffee.sender,
      count: coffee.count,
    })) || [],
  }));
};

export const addUser = async (name: string) => {
  if (await User.findByPk(name)) {
    return null;
  }
  return await User.create({ name });
};

export const addCoffee = async (sender: string, receiver: string) => {
  const senderUser = await User.findByPk(sender);
  const receiverUser = await User.findByPk(receiver);

  if (!senderUser || !receiverUser) {
    console.log('Sender or receiver not found');
    return false;
  }

  const coffeeRecord = await CoffeeCount.findOne({ where: { sender, receiver } });

  if (coffeeRecord) {
    coffeeRecord.count += 1;
    await coffeeRecord.save();
  } else {
    await CoffeeCount.create({ sender, receiver, count: 1 });
  }

  console.log('Coffee transaction successful');
  return true;
};
