// src/routes/userRoutes.ts
import { Router } from 'express';
import { getAllUsers, createUser, createCoffee } from '../controllers/userController';
import { getLogs } from '../controllers/logController';


const router = Router();

router.get('/users', getAllUsers);
router.post('/users', createUser);
router.post('/coffees', createCoffee);
router.get('/logs', getLogs);


export default router;
