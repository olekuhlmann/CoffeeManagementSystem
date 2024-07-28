// src/database.ts
import { Sequelize } from 'sequelize';
import { initModels } from './models';
import path from 'path';
import fs from 'fs';

// Define the database path
const dbPath = path.resolve(__dirname, '../tmp/database.sqlite');

// Ensure the database directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Check if the database file exists, and create it if it doesn't
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, '');
}

// Initialize Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
});

// Initialize all models
initModels(sequelize);

export default sequelize;
