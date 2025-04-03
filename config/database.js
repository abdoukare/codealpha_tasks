import mongoose from 'mongoose';

const connectDB = async() => {
	try{
		await mongoose.connect(process.env.MONGO_URI || 'mongoDB://localhost:27017/urlshornter', {
			useNewUrlParser: true,
			useUnifiedTopology:true,
		});
		console.log('connected to database!!')
	}catch(error){
		console.error(error.message);
		process.exit(1);
	}
};
export default connectDB;