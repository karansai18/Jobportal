import { User } from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDatauri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";


export const register = async (req,res)=>{
    try
    {
        const {fullname,email,phonenumber,password,role}= req.body;
        console.log(fullname,email,phonenumber,password,role);
        if(!fullname || !email || !phonenumber || !password || !role)
        {
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }




        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: "Profile photo is required", success: false });
        }
        const fileUri = getDatauri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        let user = await User.findOne({email});
        if(user)
        {
            return res.status(400).json({
                message:"User already exists with this emaiId",
                success:false
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        await User.create({
            fullname,
            email,
            phonenumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }

        });
        return res.status(201).json({
            message:"Account created successfully",
            success:true
        })
    }
   
    catch(error)
    {
        console.log(error);
    }
}
export const login = async (req,res)=>{
    try{

        const {email,password,role}= req.body;
        console.log(req.body);
        if(!password || !email || !role)
        {
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        };
        let user = await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({
                message:"Incorrect email or password.",
                success:false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch)
        {
            return res.status(400).json({
                message:"Incorrect email or password.",
                success:false
            })
        };

        // check role
        if((role !== user.role))
        {
            return res.status(400).json({
                message:"Account doesnot exist with current role.",
                success:false
            })
        }

        const tokenData = {
            userId:user._id
        }

        const token=  jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        //sending data to users not sending sensitive data to user like password

        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phonenumber:user.phonenumber,
            role:user.role,
            profile:user.profile
 
        }

        // store the cookies in cookies-> token will be stored in cookie
        // status-200 because successfully logedin
         return res
    .status(200)
    .cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production", // Only in prod
    })
    .json({
      success: true,
      message: "Logged in successfully",
      user,
    });
    


    }
    catch(error)
    {
        console.log(error);
    }
}

export const logout = async(req,res)=>
{
    try
    {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out Successfully",
            success:true

        })
    }
    catch(error)
    {
        console.log(error);
    }

}

export const updateProfile = async(req,res)=>{
    try
    {

        let {fullname,email,phonenumber,bio,skills} = req.body;
        let file = req.file;
        const fileUri = getDatauri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
       
        //cloudinary comes here
        let skillsArray
        if(skills)
        {
              skillsArray = skills.split(",");
        }
       
        let userId = req.id; //middleware authentication
        // in authentication we check wheather the user is authenticated or not. req.id contains userid (go to isAuthenticated file) that userid placed in userId here
        console.log("here is:",userId);
        let user = await User.findById(userId);
        if(!user)
        {
            return res.status(400).json({
                message:"User is not found",
                success:false
            })

        }
        
        //updating data in db
        if(fullname) user.fullname=fullname
       
        if(email) user.email=email
        if(phonenumber) user.phonenumber= phonenumber
        if(bio) user.profile.bio = bio
        if(skillsArray) user.profile.skills=skillsArray

        //resume comes here later
        if(cloudResponse)
        {
            user.profile.resume= cloudResponse.secure_url; // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname //save the original file name 
        }





        await user.save();

        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phonenumber:user.phonenumber,
            role:user.role,
            profile:user.profile

        }
        return res.status(200).json({
            message:"Profile updated successfully",
            user,
            success:true
        })



         
    
        
    }
    catch(error)
    {
        console.log(error);
    }
}