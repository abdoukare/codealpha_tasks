import { Router } from "express";
import { signup, Login } from "../Controllers/auth.js";
const router = Router();

router.post("/register", signup);
router.post("/login", Login);
//router.post("/logout", logout);
export default router;