import shortid from 'shortid';
import Url from '../models/urlModle.js';

/**
 *  Generates a unique short code for URL shortening 
 * @returns {string} A unique short code 
 */

const generateShortCode = async () => {
	try {
	  // Generate a unique short code
	  let code;
	  let isUnique = false;
	  let attempts = 0;
	  const maxAttempts = 5;
  
	  while (!isUnique && attempts < maxAttempts) {
		code = shortid.generate();
		const existingUrl = await Url.findOne({ shortCode: code });
		
		if (!existingUrl) {
		  isUnique = true;
		}
		attempts++;
	  }
  
	  if (!isUnique) {
		throw new Error('Failed to generate unique short code after multiple attempts');
	  }
  
	  return code;
	} catch (err) {
	  console.error('Error in generateShortCode:', err);
	  // Fallback to random string if shortid fails
	  return Math.random().toString(36).substring(2, 8);
	}
  };
  
  export default  generateShortCode;