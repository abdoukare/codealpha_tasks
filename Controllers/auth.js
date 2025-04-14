import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {JWT_SECRET, JWT_EXPIRE} from '../Config/env.js';
import  User  from '../models/Users.js'; // Changed to destructured import

export const Signup = async(req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const {name, email, password, role} = req.body;
        
        // check if the user exists 
        const existingUser = await User.findOne({email}).session(session);
        if(existingUser) {
            await session.abortTransaction();
            return res.status(400).json({error: 'User already exists'});
        }
        
        // hash password 
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // create new user
        const newUser = new User({
            name, 
            email, 
            password: hashedPassword,
            role
        });
        
        await newUser.save({session});
        
        // Generate token for user 
        const token = jwt.sign(
            {_id: newUser._id, role: newUser.role},
            JWT_SECRET,
            {expiresIn: JWT_EXPIRE}
        );
        
        await session.commitTransaction();
        
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: newUser,
            token,
        });
    } catch(error) {
        await session.abortTransaction();
        console.log('Error in signup:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    } finally {
        session.endSession();
    }
}; 

export const login = async(req, res, next) => {
	const session = await mongoose.startSession();
	session.startTransaction();
	try{
		const {email, password} = req.body;
		const user = await User.findOne({email}).session(session);
		if(!user){
			await session.abortTransaction();
			return res.status(400).json({error: 'Invalid User'});
		}
		// check if the password is correct
		const isValid = await bcrypt.compare(password, user.password);
		if(!isValid){
			await session.abortTransaction();
			const error = new Error('Invalid password');
			error.statusCode = 401;
			throw error;
		}
		// Generate token for user
		const token = jwt.sign({_id:user._id, role: user.role}, JWT_SECRET, {expiresIn: JWT_EXPIRE});
		res.status(200).json({
			message:"User logged in successfully",
			data:user,
			token
		});
	}catch(error){
		next(error);
	};
};