
import {Company} from "../models/companymodel.js";
import cloudinary from '../utils/cloudinary.js'
import getDataUri from '../utils/dataUri.js';
export const Cregister= async(req,res)=>{ 
    try
    {
        const {companyName}= req.body;
        if(!companyName)
        {
            return res.status(400).json({
                message:"Company name id required",
                success:false
            })
        } 
        let company = await Company.findOne({name:companyName});
        if(company)
        {
            return res.status(400).json({
                message:"You cant register same company",
                success:false,
            })
        }
        company = await Company.create({
            name:companyName, 
            userId:req.id

        })
        return res.status(201).json({
            message:"Company registered successfully",
            company,
            success:true
        })

    }
    catch(error)
    {
        console.log(error);
    }
}

export const getCompany= async(req,res)=>{
    try
    {
        const userId = req.id;  // loggedin userId (authention is successed)
        const companies = await Company.find({userId});
        if(!companies)
        {
            return res.status(400).json({
                message:"companies not found",
                success:false 
            })
        }
        // getting companies that user have created user means here recruiter

        return res.status(200).json({
            companies,
            success:true
        })

    }
    catch(error)
    {
        console.log(error);
    }
}

export const getCompanyById = async(req,res)=>{
    try{
        const companyId = req.params.id;
        const company= await Company.findById(companyId);
        if(!company)
        {
            return res.status(404).json({
                message:"Company not found",
                success:false
            })
        }
        return res.status(200).json({
            company,
            success:true
        })
        
    }
    catch(error)
    {
        console.log(error);
    }
}

export const updateCompnay = async(req,res)=>{
    try
    {


        const {name,description,website,location}= req.body
        console.log(name,description,website,location);
        const file = req.file;

         // space for cloudinary 
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;


        const udpateData = {name,description,website,location,logo};
        console.log(name,description,website,location);
        const compnay = await Company.findByIdAndUpdate(req.params.id,udpateData,{new:true});

        if(!compnay)
        {
            return res.status(404).json({
                message:"company not found",
                success:false
            })
        }
         return res.status(200).json({
            message:"company information updated",
            success:true
        })



    }
    catch(error)
    {
        console.log(error);
    }
}