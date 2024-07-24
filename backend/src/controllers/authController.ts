import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_PASSWORD = process.env.SECRET_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const login = (req: Request, res: Response) => {
  const { password } = req.body;
  if (password === SECRET_PASSWORD) {
    const token = jwt.sign({}, JWT_SECRET, { expiresIn: '90d' }); // Token expires in 90 days
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'lax',
      maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
    });
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).send('Invalid password');
  }
};