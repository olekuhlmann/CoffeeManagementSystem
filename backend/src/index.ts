import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import sequelize from './database';
import { authenticateToken } from './middleware/authMiddleware';
import rateLimit from 'express-rate-limit';
import serverless from 'serverless-http';

const app = express();
const port = process.env.PORT || 5000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

// Configure CORS to allow requests from your frontend origin and credentials
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(limiter);

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api', authenticateToken, userRoutes);

// Sync database and start Express server locally
if (process.env.IS_LOCAL) {
  sequelize.sync({ alter: true }).then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }).catch((error) => {
    console.error('Failed to sync database:', error);
  });
}

// Export the Lambda handler for serverless deployment
export const handler = serverless(app);
