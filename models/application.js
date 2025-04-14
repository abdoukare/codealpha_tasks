import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
	jobId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Job',
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	status: {
		type: String,
		enum: ['pending', 'accepted', 'rejected'],
		default: 'pending',
		lowercase: true,
	}
}, {
	timestamps: true
});
const Application = mongoose.model('Application', ApplicationSchema);
export default Application;