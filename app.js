import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/database.js';
import urlRoutes from './src/Routes/urlRoutes.js';
import {constants} from 'http2';
import mongoose from 'mongoose';

dotenv.config();
export const app = express();
// connect to database 
connectDB();
// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// routes 
app.use('/', urlRoutes);

// error handling 
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong!' });
  });

connectDB();
app.listen(5500, (req, res)=>{
	console.log("server is listning on http://localhost:5500");
});
