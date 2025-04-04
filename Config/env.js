// env.js
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: join(__dirname, '../.env') });

// Add debug logging
console.log('Environment Variables:', {
    DB_URI: process.env.DB_URI,
    PORT: process.env.PORT
});

export const PORT = process.env.PORT || 4500;
export const DB_URI = process.env.DB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRE = process.env.JWT_EXPIRE;
export const NODE_ENV = process.env.NODE_ENV;