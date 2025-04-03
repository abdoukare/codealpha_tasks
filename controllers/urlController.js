import  generateShortCode  from '../utils/shortnner.js';
import Url from '../models/urlModle.js';
import { isWebUri } from 'valid-url';
import { constants } from 'http2';

// Shorten URL
export const shortenUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    // Validate URL
    if (!originalUrl || !isWebUri(originalUrl)) {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    // Check if URL already exists
    const existingUrl = await Url.findOne({ originalUrl });
    if (existingUrl) {
      return res.json(existingUrl);
    }

    // Create new short URL
    const shortCode = await generateShortCode();
    const newUrl = new Url({
      originalUrl,
      shortCode
    });

    await newUrl.save();

    res.status(201).json({
      originalUrl,
      shortUrl: `${req.protocol}://${req.get('host')}/${shortCode}`,
      shortCode
    });

  } catch (error) {
    console.error('Shorten URL Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Redirect to original URL
export const redirectToOriginalUrl = async (req, res) => {
	try {
	  const { shortCode } = req.params;
	  console.log(`Attempting redirect for code: ${shortCode}`); // Debug log
  
	  // Find the URL and increment clicks
	  const url = await Url.findOneAndUpdate(
		{ shortCode },
		{ $inc: { clicks: 1 } },
		{ new: true } // Return the updated document
	  );
  
	  if (!url) {
		console.log('Short code not found in DB:', shortCode); // Debug log
		return res.status(404).json({ error: 'Short URL not found' });
	  }
  
	  console.log('Redirecting to:', url.originalUrl); // Debug log
	  return res.redirect(301, url.originalUrl); // 301 = Permanent redirect
  
	} catch (error) {
	  console.error('Redirect failed:', error);
	  res.status(500).json({ error: 'Server error during redirect' });
	}
  };
export default {
	shortenUrl,
	redirectToOriginalUrl,
}