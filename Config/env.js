import dotenv from 'dotenv';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// load enviroment variables from .env file
dotenv.config({ path: join(__dirname, '../.env') });

// add debug loging 
console.log('Environment variables loaded:', {
	DB_URi: process.env.DB_URI,
	PORT: process.env.PORT,});

// export enviroment variables

export const PORT = process.env.PORT || 3300;
export const DB_URI = process.env.DB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRE = process.env.JWT_EXPIRE;
export const NODE_ENV = process.env.NODE_ENV;