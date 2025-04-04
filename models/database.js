// database.js
import mongoose from 'mongoose';
import { DB_URI } from '../Config/env.js';

const connectDB = async () => {
    try {
        if (!DB_URI) {
            throw new Error('Database URI is not defined. Please check your environment variables.');
        }
        
        const conn = await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database Connection Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;