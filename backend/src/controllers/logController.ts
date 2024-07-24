// src/controllers/logController.ts
import { Request, Response } from 'express';
import { Log } from '../models';

export const getLogs = async (req: Request, res: Response): Promise<void> => {
    const  logs = await Log.findAll({ order: [['createdAt', 'DESC']] })
    res.json(logs);
};