
// import express from "express";
// const router = express.Router();
// import { login, register, updateProfile,logout } from '../controllers/usercontroller.js';

// // import {login,register,updateProfile} from "../controllers/usercontroller.js"
// import  isAuthenticated from "../middleware/isAuthenticated.js";
// import { singleUpload } from "../middleware/multer.js";



// router.route("/register").post(singleUpload,register);
// router.route("/login").post(login);
// router.route("/logout").get(logout);
// router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);  // for this we need authentication . After authentication only we can updateprofile for that create use miidlewares genrally mw validtes,checks authentication go to isAuthenticated.js

// export default router;



import express from "express";
const router = express.Router();
import { login, register, updateProfile, logout, autoApplyFromResume } from '../controllers/usercontroller.js';
import isAuthenticated from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

// Auth Routes
router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);

// Profile & Automation Routes
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);
router.route("/profile/auto-apply").post(isAuthenticated, autoApplyFromResume); // New route

export default router;