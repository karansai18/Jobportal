import {Application} from "../models/applicationmodel.js";
import {Job} from "../models/jobmodel.js"
export const applyJob = async(req,res)=>{
    try{
        const userId = req.id;
        const jobId= req.params.id;
        if(!jobId)
        {
            return res.status(400).json({
                message:"Job id is required",
                success:false
            })  
        }  

        //check if the user has already applied for that job
        const existingApplication = await Application.findOne({job:jobId,applicant:userId});
        if(existingApplication)
        {
            return res.status(400).json({
                message:"you have already appiled for this job",
                success:false
            })
        }
        // check if the job exist
        const job  = await Job.findById(jobId);
        if(!job)
        {
            return res.json(404).json({
                 message:"Job not found",
                 success:false
            })
        }

        //create a new Application

        const  newApplication = await Application.create({
            job:jobId,
            applicant:userId
        })  
        job.applications.push(newApplication._id)
        // storing the applicants in application array see in jobmodel
        await job.save();
        return res.status(201).json({
            message:"Job appiled successfully",
            success:true
        })
    }
    catch(error)
    {
        console.log(error);
    }
};
// Important remove populate and see apply populate and see
export const getAppiledJobs = async(req,res)=>{
    try{
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({created:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{createdAt:-1}},
            }
        })
        if(!application)
        {
            return res.status(404).json({
                 message:"No Applications",
                 success:false 
            })
        }
        return res.status(200).json({
            application,
            success:true
        })
        
    }
    catch(error)
    {
        console.log(error);
    }
}


// to check by admin how many of them appiled for job

export const getApplicants = async(req,res)=>{
    try{
        const jobid = req.params.id;
        const job = await Job.findById(jobid).populate({
            path:'applications',
            model:'Application',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!job)
        {
            return res.status(404).json({
                message:'Job not found',
                success:false
            })
        }
        return res.status(201).json({
            job,
            success:true
        });

    }
    catch(error)
    {
        console.log(error);
    }

}

export const updateStatus = async(req,res)=>{
    try
    {
        const {status} = req.body;
        const applicantionId = req.params.id;
        if(!status)
        {
            return res.status(404).json({
                message:'Status is required',
                success:false
            })
        }
        // find the application by application id
        const application = await Application.findOne({_id:applicantionId})
        if(!application)
        {
            return res.status(404).json({
                message:'Application not found',
                success:false
            })
        }
        // update the status
        application.status= status.toLowerCase();
        await application.save();
        return res.status(200).json({
            message:'Status updated successfully',
            success:true
        })
    } 
    catch(error)
    {
        console.log(error);
    }
}