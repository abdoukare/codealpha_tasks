import Event from '../models/envt.js';
import User from '../models/user.js';

// create a new event (Admin only)
export const createEvent = async (req, res, next) => {
	try{
		const event =  new Event(req.body);
		await event.save();
		res.status(201).json({ message: 'Event created successfully', event });
	}catch(error){
		next(error);
	};
};
// Get all events
export const getAllEvents = async (req, res) => {
	try {
	  const events = await Event.find();
	  res.json(events);
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  };
// Register for an event
export const registerForEvent = async (req, res) => {
	try {
	  const event = await Event.findById(req.params.eventId);
	  const user = await User.findById(req.user._id);
  
	  if (!event || !user) {
		return res.status(404).json({ error: 'Event or user not found' });
	  }
  
	  // Check if already registered
	  if (event.registeredUsers.includes(req.user._id)) {
		return res.status(400).json({ error: 'Already registered for this event' });
	  }
  
	  // Check if event is full
	  if (event.registeredUsers.length >= event.maxParticipants) {
		return res.status(400).json({ error: 'Event is full' });
	  }
  
	  event.registeredUsers.push(req.user._id);
	  user.registeredEvents.push(event._id);
  
	  await event.save();
	  await user.save();
  
	  res.json({ message: 'Successfully registered for the event' });
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  };
  // get user's registrated events 
  export const getUserEvents = async (req, res) => {
	try{
		const user = await User.findById(req.user._id).populate('registredEvents');
		res.json(user.registeredEvents);
	}catch(error){
		res.status(500).json({ error: error.message });
	}
  };
  // cancel registration 
  export const cancelRegistration = async (req, res) => {
	try {
	  const event = await Event.findById(req.params.eventId);
	  const user = await User.findById(req.user._id);
  
	  if (!event || !user) {
		return res.status(404).json({ error: 'Event or user not found' });
	  }
  
	  // Remove user from event
	  event.registeredUsers = event.registeredUsers.filter(
		userId => userId.toString() !== req.user._id.toString()
	  );
  
	  // Remove event from user
	  user.registeredEvents = user.registeredEvents.filter(
		eventId => eventId.toString() !== req.params.eventId
	  );
  
	  await event.save();
	  await user.save();
  
	  res.json({ message: 'Registration cancelled successfully' });
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  };