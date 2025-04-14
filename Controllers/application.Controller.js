import Application from "../models/application.js"; 
import Job from "../models/job.js";

export const applyJob = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const jobId = req.params.id; // Get jobId from URL params instead of body

        // Check if the job exists
        if(!jobId) {
            return res.status(400).json({
                success: false,
                message: 'Job ID is required',
            });
        }

        const job = await Job.findById(jobId);
        if(!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found',
            });
        }

        // Check if user is a seeker
        if(req.user.role !== 'seeker') {
            return res.status(403).json({
                success: false,
                message: 'Only job seekers can apply for jobs',
            });
        }

        // Check if already applied
        const existingApplication = await Application.findOne({
            jobId: jobId,
            userId: userId
        });

        if(existingApplication) {
            return res.status(400).json({
                success: false,
                message: 'You have already applied for this job',
            });
        }

        // Create new application
        const application = new Application({
            jobId,
            userId,
            status: 'pending'
        });

        await application.save();

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully',
            data: application
        });

    } catch(error) {
        next(error);
    }
};

export const getJobApplicants = async (req,res,next) => {
	try {
		const {jobId} = req.params;
		const application = await Application.find({jobId})
				.populate('userId', 'name email')
				.populate('jobId', 'title ');

				if(!application.length){
					return res.status(404).json({message: 'No applicants found for this job'});
				};
				res.status(200).json({application: application});
	}catch(error){
		next(error);
	}
}