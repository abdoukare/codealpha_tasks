import User from '../models/Users.js';

export const getAllUsers = async (req, res, next) => {
	try{
		const users = await User.find();
		res.status(201).json({
			success:true,
			message:'All Users',
			data:users,
		});
	}catch(error){
		next(error);
	};
};

export const getUserByID = async (req, res, next) => {
	try{
		const user = await User.findById(req.params.id).select('-password'); // Exclude password from the response
		if(!user){
			res.status(404).json({
				success:false,
				message:'User not found',
			});
		}
		res.status(201).json({
			success:true,
			message:'User found',
			data:user,
		});
	}catch(error){
		next(error);
	};
};