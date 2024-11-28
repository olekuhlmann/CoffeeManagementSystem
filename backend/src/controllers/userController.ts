// src/controllers/userController.ts
import { Request, Response } from 'express';
import { getUsers, addUser } from '../services/userService';

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await getUsers();
  res.json(users);
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;
  const newUser = await addUser(name);
  if (newUser) {
    res.status(201).json({ message: 'User added' });
  } else {
    res.status(400).json({ error: 'User already exists' });
  }
};

