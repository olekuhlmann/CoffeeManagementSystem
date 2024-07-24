// src/index.ts
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import sequelize from './database';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes);

sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch((error) => {
  console.error('Failed to sync database:', error);
});
