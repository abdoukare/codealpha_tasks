import express from 'express';
import {
  shortenUrl,
  redirectToOriginalUrl
} from '../controllers/urlController.js';

const router = express.Router();

// Test route
router.get('/', (req, res) => {
  res.send('URL Shortener API is working!');
});

// URL Shortener routes
router.post('/shorten', (req, res) => shortenUrl(req, res));  // Wrap in arrow function
router.get('/:shortCode', (req, res) => redirectToOriginalUrl(req, res));  // Wrap in arrow function

export default router;