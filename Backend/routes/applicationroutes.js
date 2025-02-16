
import express from "express";
const router = express.Router();
import { applyJob, getAppiledJobs, getApplicants, updateStatus } from '../controllers/applicationcontoller.js';

// import {login,register,updateProfile} from "../controllers/usercontroller.js"
import  isAuthenticated from "../middleware/isAuthenticated.js";



router.route("/apply/:id").get(isAuthenticated,applyJob);
router.route("/get").get(isAuthenticated,getAppiledJobs);
router.route("/:id/applicants").get(isAuthenticated,getApplicants);
router.route("/status/:id/update").post(isAuthenticated,updateStatus); 

export default router;