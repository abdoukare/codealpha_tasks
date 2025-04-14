import Router from 'express'
import { Signup, login } from '../Controllers/auth.js';
const router = Router();

router.post('/Signup', Signup);
router.post('/login', login);

export default router;