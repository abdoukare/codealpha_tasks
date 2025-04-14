import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	describtion: {
		type: String,
		required: true,
		trim: true,
	},
	location: {
		type: String,
		required: true,
		trim: true,
	},
	salary: {
		type: Number,
		required: true,
		min: 0,
	},
}, {
	timestamps: true
});
const Job = mongoose.model('Job', JobSchema);
export default Job;