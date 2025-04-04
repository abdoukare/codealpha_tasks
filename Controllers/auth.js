import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRE } from "../Config/env.js";
import User from "../models/user.js";
// sign in a new user 
export const signup = async (req, res) => {
	const session = await mongoose.startSession();
	session.startTransaction();
	
	try {
	  const { name, email, password, isAdmin } = req.body;
  
	  // Check if user exists
	  const existingUser = await User.findOne({ email }).session(session);
	  if (existingUser) {
		await session.abortTransaction();
		return res.status(400).json({ error: 'Email already exists' });
	  }
  
	  // Create user
	  const user = new User({ name, email, password, isAdmin });
	  await user.save({ session });
  
	  // Generate token
	  const token = jwt.sign(
		{ _id: user._id, isAdmin },
		process.env.JWT_SECRET,
		{ expiresIn: '1d' }
	  );
  
	  await session.commitTransaction();
	  res.status(201).json({ user, token });
  
	} catch (error) {
	  await session.abortTransaction();
	  console.error('Registration error:', error);
	  res.status(500).json({ error: 'Registration failed' });
	} finally {
	  session.endSession();
	}
  };;
// login a user
export const Login = async (req, res, next) => {
	try{
		const {email, password} = req.body;
		const user = await User.findOne({email});
		if(!user){
			return res.status(400).json({message:"User not found"});			
		};
		// compared password 
		const isPassValid = await bcrypt.compare(password, user.password);
		if(!isPassValid){
			const error = new Error('Invalid password');
			error.statusCode = 401
			throw error;
		}
		const token = jwt.sign({id:user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRE});
		res.status(200).json({
			message:"User logged in successfully",
			data:user,
			token
		});

	}catch(error){
		next(error);
	}
};