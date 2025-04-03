import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema({
	originalUrl:{
		type: String,
		required: true,
	},
	shortCode:{
		type: String,
		required: true,
		unique: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	clicks: {
		type: Number,
		default: 0,
	},
});
// indexing fro faster quering by the shortCode

//UrlSchema.index({shortCode: 1});
export default  mongoose.model('Url', UrlSchema);