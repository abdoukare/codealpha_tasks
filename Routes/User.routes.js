import { Router } from "express";
import { getUserByID, getAllUsers } from "../Controllers/Users.Controller.js";
import authorize from '../middlewares/authorization.js';
import { login, Signup } from "../Controllers/auth.js";
const router = Router();


router.get('/', authorize, getAllUsers);