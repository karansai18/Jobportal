
import express from "express";
const router = express.Router();
import { postJob,getAllJobs,getJobById,getadmincreatedjobs } from '../controllers/jobcontoller.js';

// import {login,register,updateProfile} from "../controllers/usercontroller.js"
import  isAuthenticated from "../middleware/isAuthenticated.js";



router.route("/post").post(isAuthenticated,postJob);
router.route("/getjobs").get(isAuthenticated,getAllJobs);
router.route("/getjobs/:id").get(isAuthenticated,getJobById);
router.route("/getadminjobs").get(isAuthenticated,getadmincreatedjobs);
export default router;  