import Router from "express";
import {createJob, GetJob, getJobByID} from "../Controllers/Job.Controller.js";
import authorize from "../Middlewares/authorization.js";

const router = Router();
// public routes 
router.get('/', GetJob);
router.get('/:id', getJobByID);

// authorized routes 
router.post('/Create', authorize, createJob);

export default router;