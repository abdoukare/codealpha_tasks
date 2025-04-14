import mongoose from "mongoose";
import {DB_URI} from "../Config/env.js";

const connectDB = async () => {
	try {
		if(!DB_URI){
			throw new Error('Database URI is not defined in the enviroment variables');
		}
		const connection = await mongoose.connect(DB_URI, {
			//useNewUrlParser: true,
			//useUnifiedTopology: true,
			//UserCreatedIndex: true,
		});
		console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
	}catch(error){
		console.error(`❌ Database Connection Error: ${error.message}`);
		process.exit(1); // Exit process with failure
	}
};
export default connectDB;