import express from 'express';
import { PORT, DB_URI } from './Config/env.js';
import UserRoutes from './Routes/user.Routes.js';
import AuthRoutes from './Routes/auth.Routes.js';
import EventRoutes from './Routes/events.Routes.js';
import mongoose from 'mongoose';
//import cors from 'cors'; // Important for frontend connectivity
//import { errorHandler, notFound } from './middlewares/error.middleware.js'; // Example error handlers

const app = express();

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

// Middleware
//app.use(cors()); // Enable CORS for frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic Route
app.get('/', (req, res) => {
  res.json({
    message: 'Event Registration API',
    endpoints: {
      auth: '/api/v1/auth',
      users: '/api/v1/users',
      events: '/api/v1/events'
    }
  });
});

// API Routes
app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/events', EventRoutes);



// Server Initialization
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📚 API Docs available at http://localhost:${PORT}/api-docs`); // If you add Swagger later
    });
  } catch (error) {
    console.error('💥 Failed to start server:', error.message);
    process.exit(1);
  }
};

// Start the server
startServer();

export default app;