// src/controllers/userController.ts
import { Request, Response } from 'express';
import { getUsers, addUser } from '../services/userService';

/**
 * Retrieves all users with their coffee debts from the database and sends them as a JSON response.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A promise that resolves to void.
 */
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await getUsers();
  res.json(users);
  console.log('Users sent');
};

/**
 * Creates a new user and adds them to the database.
 *
 * @param req - The request object containing name of the user to be created.
 * @param res - The response object.
 * @returns A promise that resolves to void.
 */
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;
  const newUser = await addUser(name);
  if (newUser) {
    res.status(201).json({ message: 'User added' });
  } else {
    res.status(400).json({ error: 'User already exists' });
  }
};

