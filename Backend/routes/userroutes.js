
import express from "express";
const router = express.Router();
import { login, register, updateProfile,logout } from '../controllers/usercontroller.js';

// import {login,register,updateProfile} from "../controllers/usercontroller.js"
import  isAuthenticated from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";



router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,updateProfile);  // for this we need authentication . After authentication only we can updateprofile for that create use miidlewares genrally mw validtes,checks authentication go to isAuthenticated.js

export default router;