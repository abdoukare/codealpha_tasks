import express from 'express';
import {
	createEvent,
	getAllEvents,
	registerForEvent,
	getUserEvents,
	cancelRegistration
  } from '../Controllers/Event.js';
import  authorize  from '../middlewares/auth.middleware.js';
const router = express.Router();
// public routes
router.get('/', getAllEvents);
// private routes
router.post('/', authorize, createEvent); // Admin only
router.post('/:eventId/register', authorize, registerForEvent); // User registration
router.get('/my-events', authorize, getUserEvents); // Get user's registered events
router.delete('/:eventId/cancel', authorize, cancelRegistration); // Cancel registration\

export default router;