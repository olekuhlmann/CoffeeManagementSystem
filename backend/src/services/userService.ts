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
  await Log.create({ type: 'createUser', userId: user.id });
  return user;
};

