import Job from "../models/job.js";


export const createJob = async (req, res, next) => {
    try {
        const {title, describtion, location, salary, company} = req.body; // Added company here
        
        // check if the user is employer 
        if(req.user.role !== 'employer'){
            return res.status(403).json({
                success: false,
                message: 'Not authorized to create a job',
            });
        }
        
        // create new job
        const job = new Job({
            title,
            describtion,
            location,
            salary,
            company,
            createdBy: req.user._id, // Uncommented this
        });
        
        await job.save();
        res.status(201).json({
            success: true,
            message: 'Job created successfully',
            data: job,
        });
    } catch(error) {
        next(error);
    }
};      

// get all jobs 
export const GetJob = async(req, res, next) => {
	try{
		const job = await Job.find();
		if(!job){
			return res.status(404).json({
				success: false,
				message: 'No jobs found',
			});
		}
		res.status(200).json({
			success: true,
			message: 'All jobs',
			data: job,
		});
	}catch(error){
		next(error);
	}
};

// get job by id
export const getJobByID = async(req,res,next) => {
	try{
		const {id} = req.params;
		// validation 
		if(!id){
			return res.status(400).json({
				success: false,
				message:'Job id is required',
			});
		}
		const job = await Job.findById(req.params.id);
		if(!job){
			return res.status(401).json({
				success:false,
				message:'No job found',
				data:job,
			});
		}
		res.status(201).json({
			success:true,
			message:'Job found ',
		});
	}catch(error){
		next(error);
	};
};