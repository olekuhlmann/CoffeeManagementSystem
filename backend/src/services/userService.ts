// src/services/userService.ts
import { User, CoffeeCount, Log } from '../models';

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
  if (!name || await User.findByPk(name)) {
    return null;
  }
  const user = await User.create({ name });
  await Log.create({ message: `User ${name} was created` });
  return user;
};

export const addCoffee = async (sender: string, receiver: string) => {
  if (sender === receiver) {
    console.log('Sender and receiver cannot be the same');
    return false;
  }

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

  await Log.create({ message: `${sender} bought a coffee for ${receiver}` });

  console.log('Coffee transaction successful');
  return true;
};
