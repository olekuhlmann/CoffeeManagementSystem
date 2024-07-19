// src/routes/userRoutes.ts
import { Router } from 'express';
import { getAllUsers, createUser, createCoffee } from '../controllers/userController';

const router = Router();

router.get('/users', getAllUsers);
router.post('/users', createUser);
router.post('/coffees', createCoffee);

export default router;
