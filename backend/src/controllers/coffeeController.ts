// src/controllers/coffeeController.ts
import { Request, Response } from 'express';
import { addCoffee } from '../services/coffeeService';

/**
 * Creates a new coffee transaction between a buyer and a receiver.
 * 
 * @param req - The request object containing the buyer and receiver names.
 * @param res - The response object.
 * @returns A promise that resolves to void.
 */
export const createCoffee = async (req: Request, res: Response): Promise<void> => {
    const { buyer, receiver } = req.body;
    if (await addCoffee(buyer, receiver)) {
        res.status(201).json({ message: 'Coffee added' });
    } else {
        res.status(400).json({ error: 'User not found' });
    }
};
