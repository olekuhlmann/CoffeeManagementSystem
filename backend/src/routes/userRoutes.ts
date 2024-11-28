// src/routes/userRoutes.ts
import { Router } from 'express';
import { getAllUsers, createUser } from '../controllers/userController';
import { getLogs } from '../controllers/logController';
import { createCoffee } from '../controllers/coffeeController';


const router = Router();

router.get('/users', getAllUsers);
router.post('/users', createUser);
router.post('/coffees', createCoffee);
router.get('/logs', getLogs);


export default router;
