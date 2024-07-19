// src/controllers/userController.ts
import { Request, Response } from 'express';
import { getUsers, addUser, addCoffee } from '../services/userService';

export const getAllUsers = (req: Request, res: Response): void => {
  res.json(getUsers());
};

export const createUser = (req: Request, res: Response): void => {
  const { name } = req.body;
  const newUser = addUser(name);
  if (newUser) {
    res.status(201).json({ message: 'User added' });
  } else {
    res.status(400).json({ error: 'User already exists' });
  }
};

export const createCoffee = (req: Request, res: Response): void => {
  const { buyer, receiver } = req.body;
  if (addCoffee(buyer, receiver)) {
    res.status(201).json({ message: 'Coffee added' });
  } else {
    res.status(400).json({ error: 'User not found' });
  }
};
