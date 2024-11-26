// src/services/userService.ts
import { User, CoffeeCount, Log } from '../models';

export const getUsers = async () => {
  const users = await User.findAll({
    include: [
      {
        model: CoffeeCount,
        as: 'sentCoffees',
        include: [
          {
            model: User, 
            as: 'receiver',
            attributes: ['name'],
          },
        ],
        attributes: ['count'],
      },
      {
        model: CoffeeCount,
        as: 'receivedCoffees',
        include: [
          {
            model: User, 
            as: 'sender',
            attributes: ['name'],
          },
        ],
        attributes: ['count'],
      },
    ],
  });

  return users.map(user => ({
    name: user.name,
    sentCoffees: user.sentCoffees?.map(coffee => ({
      receiver: coffee.receiver?.name || null, 
      count: coffee.count,
    })) || [],
    receivedCoffees: user.receivedCoffees?.map(coffee => ({
      sender: coffee.sender?.name || null, 
      count: coffee.count,
    })) || [],
  })).sort((a, b) => a.name.localeCompare(b.name));
};


export const addUser = async (name: string) => {
  if (!name || await User.findOne({ where: { name } })) {
    return null;
  }
  const user = await User.create({ name });
  await Log.create({ message: `User ${name} was created` });
  return user;
};

export const addCoffee = async (senderName: string, receiverName: string) => {
  if (senderName === receiverName) {
    console.log('Sender and receiver cannot be the same');
    return false;
  }

  const sender = await User.findOne({ where: { name: senderName } });
  const receiver = await User.findOne({ where: { name: receiverName } });

  if (!sender || !receiver) {
    console.log('Sender or receiver not found');
    return false;
  }

  const coffeeRecord = await CoffeeCount.findOne({
    where: { senderId: sender.id, receiverId: receiver.id },
  });

  if (coffeeRecord) {
    coffeeRecord.count += 1;
    await coffeeRecord.save();
  } else {
    await CoffeeCount.create({ senderId: sender.id, receiverId: receiver.id, count: 1 });
  }

  await Log.create({ message: `${senderName} bought a coffee for ${receiverName}` });

  console.log('Coffee transaction successful');
  return true;
};