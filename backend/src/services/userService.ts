// src/services/userService.ts
import { User, CoffeeCount, CoffeeCountSimplified, Log } from '../models';

/**
 * Retrieves a list of users with their coffee transaction details.
 * 
 * This function fetches users along with the count of coffees they have sent and received.
 * It processes the user data to a format suitable for the frontend, including mapping
 * the sent and received coffees to include the names of the sender and receiver.
 * The resulting list of users is sorted alphabetically by their names.
 * 
 * @returns {Promise<Array<{name: string, sentCoffees: Array<{receiver: string | null, count: number}>, receivedCoffees: Array<{sender: string | null, count: number}>}>>} 
 * A promise that resolves to an array of users with their coffee transaction details.
 */
export const getUsers = async (): Promise<Array<{ name: string; sentCoffees: Array<{ receiver: string | null; count: number; }>; receivedCoffees: Array<{ sender: string | null; count: number; }>; }>> => {
  const users = await getUsersWithSimplifiedCoffeeCount();

  // Map the users to a processed format for the frontend
  return users.map(user => ({
    name: user.name,
    sentCoffees: user.sentCoffeesSimplified?.map(coffee => ({
      receiver: coffee.receiver?.name || null,
      count: coffee.count,
    })) || [],
    receivedCoffees: user.receivedCoffeesSimplified?.map(coffee => ({
      sender: coffee.sender?.name || null,
      count: coffee.count,
    })) || [],
  })).sort((a, b) => a.name.localeCompare(b.name));
};

/**
 * Retrieves all users along with their simplified sent and received coffee counts.
 * Each user object includes the user, an array of sent coffees with receiver ids, names, and counts,
 * and an array of received coffees with sender names and counts.
 *
 * @returns {Promise<Array<User>>} A promise that resolves to an array of user objects with coffee counts.
 */
export const getUsersWithSimplifiedCoffeeCount = async (): Promise<Array<User>> => {
  const users = await User.findAll({
    include: [
      {
        model: CoffeeCountSimplified,
        as: 'sentCoffeesSimplified',
        include: [
          {
            model: User,
            as: 'receiver',
            attributes: ['id', 'name'],
          },
        ],
        attributes: ['count'],
      },
      {
        model: CoffeeCountSimplified,
        as: 'receivedCoffeesSimplified',
        include: [
          {
            model: User,
            as: 'sender',
            attributes: ['id', 'name'],
          },
        ],
        attributes: ['count'],
      },
    ],
  });

  return users;
}

/**
 * Retrieves all users along with their raw sent and received coffee counts.
 * Each user object includes the user, an array of sent coffees with receiver ids, names, and counts,
 * and an array of received coffees with sender names and counts.
 *
 * @returns {Promise<Array<User>>} A promise that resolves to an array of user objects with coffee counts.
 */
export const getUsersWithRawCoffeeCount = async (): Promise<Array<User>> => {
  const users = await User.findAll({
    include: [
      {
        model: CoffeeCount,
        as: 'sentCoffeesRaw',
        include: [
          {
            model: User,
            as: 'receiver',
            attributes: ['id', 'name'],
          },
        ],
        attributes: ['count'],
      },
      {
        model: CoffeeCount,
        as: 'receivedCoffeesRaw',
        include: [
          {
            model: User,
            as: 'sender',
            attributes: ['id', 'name'],
          },
        ],
        attributes: ['count'],
      },
    ],
  });

  return users;
}

/**
 * Adds a new user to the system.
 * 
 * This function creates a new user with the provided name if the name is not empty
 * and does not already exist in the database. It also logs the creation of the user.
 * 
 * @param {string} name - The name of the user to be added.
 * @returns {Promise<User | null>} A promise that resolves to the created user object, or null if the user could not be created.
 */
export const addUser = async (name: string): Promise<User | null> => {
  if (!name || await User.findOne({ where: { name } })) {
    return null;
  }
  const user = await User.create({ name });
  await Log.create({ type: 'createUser', userId: user.id });
  return user;
};

