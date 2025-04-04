import User from "../models/user.js";

export const getUsers = async (req, res, next) => {
	try{
		const users = await User.find();
		res.status(200).json({
			successs:true,
			message:"Users fetched successfully",
			data:users
		});
	}catch(error){
		next(error);
	}
};
export const getUser = async (req, res) => {
	try{
		const user = await User.findById(req.params.id).select('-password'); // exclude password from the response
		if(!user){
			res.status(404).json({
				success: false,
				message: 'User not found'
			});
		}
		res.status(200).json({success: true, data: user});
	}catch(error){
		next(error);
	}
}