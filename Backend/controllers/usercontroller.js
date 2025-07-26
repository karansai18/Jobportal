// import { User } from "../models/usermodel.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import getDatauri from "../utils/dataUri.js";
// import cloudinary from "../utils/cloudinary.js";


// export const register = async (req,res)=>{
//     try
//     {
        
//         const {fullname,email,phonenumber,password,role}= req.body;
//         console.log(fullname,email,phonenumber,password,role);
//         if(!fullname || !email || !phonenumber || !password || !role)
//         {
//             return res.status(400).json({
//                 message:"Something is missing",
//                 success:false
//             })
//         }




//         const file = req.file;

//         if (!file) {
//             return res.status(400).json({ message: "Profile photo is required", success: false });
//         }
//         const fileUri = getDatauri(file);
//         const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

//         let user = await User.findOne({email});
//         if(user)
//         {
//             return res.status(400).json({
//                 message:"User already exists with this emaiId",
//                 success:false
//             })
//         }

//         const hashedPassword = await bcrypt.hash(password,10);

//         await User.create({
//             fullname,
//             email,
//             phonenumber,
//             password: hashedPassword,
//             role,
//             profile:{
//                 profilePhoto:cloudResponse.secure_url,
//             }

//         });
//         return res.status(201).json({
//             message:"Account created successfully",
//             success:true
//         })
//     }
   
//     catch(error)
//     {
//         console.log(error);
//     }
// }
// export const login = async (req,res)=>{
//     try{

//         const {email,password,role}= req.body;
//         console.log(req.body);
//         if(!password || !email || !role)
//         {
//             return res.status(400).json({
//                 message:"Something is missing",
//                 success:false
//             })
//         };
//         let user = await User.findOne({email});
//         if(!user)
//         {
//             return res.status(400).json({
//                 message:"Incorrect email or password.",
//                 success:false
//             })
//         }
//         const isPasswordMatch = await bcrypt.compare(password,user.password);
//         if(!isPasswordMatch)
//         {
//             return res.status(400).json({
//                 message:"Incorrect email or password.",
//                 success:false
//             })
//         };

//         // check role
//         if((role !== user.role))
//         {
//             return res.status(400).json({
//                 message:"Account doesnot exist with current role.",
//                 success:false
//             })
//         }

//         const tokenData = {
//             userId:user._id
//         }

//         const token=  jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

//         //sending data to users not sending sensitive data to user like password

//         user={
//             _id:user._id,
//             fullname:user.fullname,
//             email:user.email,
//             phonenumber:user.phonenumber,
//             role:user.role,
//             profile:user.profile
 
//         }

//         // store the cookies in cookies-> token will be stored in cookie
//         // status-200 because successfully logedin
//          return res
//     .status(200)
//     .cookie("token", token, {
//       maxAge: 24 * 60 * 60 * 1000, // 1 day
//       httpOnly: true,
//       sameSite: "strict",
//       secure: process.env.NODE_ENV === "production", // Only in prod
//     })
//     .json({
//       success: true,
//       message: "Logged in successfully",
//       user,
//     });
    


//     }
//     catch(error)
//     {
//         console.log(error);
//     }
// }

// export const logout = async(req,res)=>
// {
//     try
//     {
//         return res.status(200).cookie("token","",{maxAge:0}).json({
//             message:"Logged out Successfully",
//             success:true

//         })
//     }
//     catch(error)
//     {
//         console.log(error);
//     }

// }

// export const updateProfile = async(req,res)=>{
//     try
//     {

//         let {fullname,email,phonenumber,bio,skills} = req.body;
//         let file = req.file;
//         const fileUri = getDatauri(file);
//         // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
//         const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
//   resource_type: "raw",
// });
       
//         //cloudinary comes here
//         let skillsArray
//         if(skills)
//         {
//               skillsArray = skills.split(",");
//         }
       
//         let userId = req.id; //middleware authentication
//         // in authentication we check wheather the user is authenticated or not. req.id contains userid (go to isAuthenticated file) that userid placed in userId here
//         console.log("here is:",userId);
//         let user = await User.findById(userId);
//         if(!user)
//         {
//             return res.status(400).json({
//                 message:"User is not found",
//                 success:false
//             })

//         }
        
//         //updating data in db
//         if(fullname) user.fullname=fullname
       
//         if(email) user.email=email
//         if(phonenumber) user.phonenumber= phonenumber
//         if(bio) user.profile.bio = bio
//         if(skillsArray) user.profile.skills=skillsArray

//         //resume comes here later
//         if(cloudResponse)
//         {
//             user.profile.resume= cloudResponse.secure_url; // save the cloudinary url
//             user.profile.resumeOriginalName = file.originalname //save the original file name 
//         }





//         await user.save();

//         user={
//             _id:user._id,
//             fullname:user.fullname,
//             email:user.email,
//             phonenumber:user.phonenumber,
//             role:user.role,
//             profile:user.profile

//         }
//         return res.status(200).json({
//             message:"Profile updated successfully",
//             user,
//             success:true
//         })



         
    
        
//     }
//     catch(error)
//     {
//         console.log(error);
//     }
// }

import { User } from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDatauri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
import PDFParser from "pdf2json"; // <-- 1. IMPORT THE NEW LIBRARY
import { extractSkillsFromResume } from "../utils/skillExtractor.js";
import { Job } from "../models/jobmodel.js";
import { Application } from "../models/applicationmodel.js";

// register, login, logout functions remain the same...
export const register = async (req, res) => {
    try {
        const { fullname, email, phonenumber, password, role } = req.body;
        if (!fullname || !email || !phonenumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "Profile photo is required", success: false });
        }
        const fileUri = getDatauri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists with this emaiId",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phonenumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url,
            }
        });
        return res.status(201).json({
            message: "Account created successfully",
            success: true
        })
    }
    catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!password || !email || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false
            })
        };
        if ((role !== user.role)) {
            return res.status(400).json({
                message: "Account doesnot exist with current role.",
                success: false
            })
        }
        const tokenData = {
            userId: user._id
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
            role: user.role,
            profile: user.profile
        }
        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
            })
            .json({
                success: true,
                message: "Logged in successfully",
                user,
            });
    }
    catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out Successfully",
            success: true
        })
    }
    catch (error) {
        console.log(error);
    }
}


// [UPDATED] This function now uses pdf2json to parse the resume
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phonenumber, bio } = req.body;
        const file = req.file; // This will be the resume file
        const userId = req.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User is not found", success: false });
        }

        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phonenumber) user.phonenumber = phonenumber;
        if (bio) user.profile.bio = bio;

        let skillsMessage = "";

        if (file) {
            // <-- 2. NEW LOGIC FOR PDF PARSING
            const pdfParser = new PDFParser(this, 1);
            
            const resumeText = await new Promise((resolve, reject) => {
                pdfParser.on("pdfParser_dataError", errData => {
                    console.error(errData.parserError);
                    reject(new Error("Error parsing PDF."));
                });
                pdfParser.on("pdfParser_dataReady", () => {
                    resolve(pdfParser.getRawTextContent());
                });
                pdfParser.parseBuffer(file.buffer);
            });
            // <-- END OF NEW LOGIC

            const extractedSkills = extractSkillsFromResume(resumeText);
            user.profile.skills = extractedSkills;
            skillsMessage = ` We found ${extractedSkills.length} skills in your resume and saved them to your profile.`;

            const fileUri = getDatauri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "raw",
            });

            if (cloudResponse) {
                user.profile.resume = cloudResponse.secure_url;
                user.profile.resumeOriginalName = file.originalname;
            }
        }

        await user.save();

        const userResponse = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200).json({
            message: `Profile updated successfully.${skillsMessage}`,
            user: userResponse,
            success: true,
        });

    } catch (error) {
        console.log("Error in updateProfile:", error);
        return res.status(500).json({ message: "An error occurred during profile update." });
    }
};

// This function remains the same, no changes needed here.
export const autoApplyFromResume = async (req, res) => {
    try {
        const userId = req.id;
        const MATCH_THRESHOLD = 50;

        const user = await User.findById(userId);
        if (!user || !user.profile.skills || user.profile.skills.length === 0) {
            return res.status(400).json({
                message: "Your profile has no skills. Please upload a resume first to extract skills.",
                success: false,
            });
        }
        const userSkills = new Set(user.profile.skills.map(s => s.toLowerCase()));

        const userApplications = await Application.find({ applicant: userId }).select('job -_id');
        const appliedJobIds = userApplications.map(app => app.job);

        const allJobs = await Job.find({
            _id: { $nin: appliedJobIds }
        });

        let appliedCount = 0;
        const appliedToJobs = [];

        for (const job of allJobs) {
            const requiredSkills = new Set(job.requirements.map(r => r.toLowerCase()));
            if (requiredSkills.size === 0) continue;

            let matchCount = 0;
            userSkills.forEach(userSkill => {
                if (requiredSkills.has(userSkill)) {
                    matchCount++;
                }
            });

            const matchPercentage = (matchCount / requiredSkills.size) * 100;

            if (matchPercentage >= MATCH_THRESHOLD) {
                const newApplication = await Application.create({
                    job: job._id,
                    applicant: userId,
                });

                job.applications.push(newApplication._id);
                await job.save();

                appliedCount++;
                appliedToJobs.push(job.title);
            }
        }

        if (appliedCount === 0) {
            return res.status(200).json({
                message: "No new matching jobs found based on your skills. Try again later!",
                appliedCount,
                success: true
            });
        }

        return res.status(200).json({
            message: `Successfully auto-applied to ${appliedCount} new jobs!`,
            appliedJobs: appliedToJobs,
            appliedCount,
            success: true
        });

    } catch (error) {
        console.log("Error in autoApplyFromResume:", error);
        return res.status(500).json({ message: "An error occurred during the auto-apply process." });
    }
};
