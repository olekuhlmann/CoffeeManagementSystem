import { Router } from 'express';
import { login } from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', login);
router.get('/check', authenticateToken, (req, res) => {
  res.status(200).json({ authenticated: true });
});

export default router;
