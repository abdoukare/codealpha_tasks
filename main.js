import express from 'express';
import dotenv from 'dotenv';
import connectDB from './models/database.js';
import {PORT, DB_URI} from './Config/env.js';
import Job from './models/job.js';
import User from './models/Users.js';
import Application from './models/application.js';
import JobRoutes from './Routes/Job.routes.js';
import AuthRoutes from './Routes/Auth.Routes.js';
import ApplicationRoutes from './Routes/Application.Routes.js';
import mongoose from 'mongoose';
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// database connection 


// middlewares 

// routes 
app.get('/', (req, res) => {
	res.json({
	  message: 'Job Board API',
	  endpoints: {
		auth: '/api/v1/auth',
		jobs: '/api/v1/jobs',
		applications: '/api/v1/applications'
	  }
	});
  });
// API routes
app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/jobs', JobRoutes);
app.use('/api/v1/applications', ApplicationRoutes); 
//app.use('/api/v1/applications', ApplicationRoutes); // Add this route
// error handling

// server initialization 

const StartServer = async() => {
	try{
		await connectDB();
		app.listen(PORT, () => {
			console.log(`🚀 Server running on http://localhost:${PORT}`);
			console.log(`📚 API Docs available at http://localhost:${PORT}/api-docs`);
		});
	}catch(error){
		console.log('💥 Failed to start server:', error.message);
		process.exit(1); // Exit process with failure
	}
};
StartServer();

export default app;