
import express from "express";
const router = express.Router();
import { getCompany, Cregister, getCompanyById,updateCompnay } from '../controllers/companycontroller.js';

// import {login,register,updateProfile} from "../controllers/usercontroller.js"
import  isAuthenticated from "../middleware/isAuthenticated.js";
import {singleUpload} from '../middleware/multer.js';



router.route("/register").post(isAuthenticated,Cregister);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
router.route("/update/:id").put(isAuthenticated,singleUpload,updateCompnay);  // for this we need authentication . After authentication only we can updateprofile for that create use miidlewares genrally mw validtes,checks authentication go to isAuthenticated.js

export default router;