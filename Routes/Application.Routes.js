import Router from "express";
import { applyJob, getJobApplicants } from "../Controllers/application.Controller.js";
import authorize from "../Middlewares/authorization.js";

const router = Router();
router.post("/:id/apply", authorize, applyJob);
router.get("/:jobId", authorize, getJobApplicants); // Get applicants for a specific job
export default router;