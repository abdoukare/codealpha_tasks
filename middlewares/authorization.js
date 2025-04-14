import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../Config/env.js';
import  User from '../models/Users.js';




const authorize = async(req, res, next) => {
	try{
		let token;
		if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
			token = req.headers.authorization.split(' ')[1];
		}
		if(!token){
			return res.status(401).json({
				success: false,
				message: 'Not authorized, no token',
			});
		}
		const decoded = jwt.verify(token, JWT_SECRET);
		const user = await User.findById(decoded._id);
		if(!user){
			return res.status(401).json({
				success: false,
				message: 'Not authorized, user not found',
			});
		}
		req.user = user;
		next();
	}catch(error){
		return res.status(401).json({
			success: false,
			message: 'Not authorized, token failed',
		});
	};
};

export default authorize;