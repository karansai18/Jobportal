import {Job} from "../models/jobmodel.js"
export const postJob = async(req,res)=>{
    try
    {

        const {title,description,requirements,salary,location,jobType,experience,position,companyId}= req.body;
        const userId= req.id;
        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId)
        {
            return res.status(400).json({
                message:"something is missing",
                suceess:false
            })
        }
        const job = await Job.create({
            title,
            description,
            requirements:requirements.split(","),
            salary:Number(salary),
            location,
            jobType,
            experienceLevel:experience,  
            position,
            company:companyId,
            created_by:userId
        });
        return res.status(201).json({
            message:"New job created successfully",
            job,
            success:true,
        })
    } 
    catch(error)
    {
        console.log(error);
    }
}

export const getAllJobs = async(req,res)=>{
    try
    {
        const keyword = req.query.keyword || "";
        // filtering based on keyword https://localhost:8000/api/v1/?keyword="frontend developer"
         const query = {
            $or:[
                {title:{$regex:keyword, $options:"i"}},
                {description :{$regex:keyword,$options:"i"}},
                // options:"i"-> represents case sensitive
                 
            ]
        };
        //The $or operator is used to specify multiple conditions. A document will match if any of the conditions in $or are true.
//         $regex is a MongoDB operator that allows searching for strings using regular expressions.
// In this case, it's used to perform a partial match on the title and description fields of the job documents.
// How It Works:

// The keyword is matched against the title and description fields.
// If a field contains the keyword (even as a substring), it will be included in the search results.
// Example:

// If keyword = "frontend":
// Jobs with titles like "Frontend Developer", "Senior Frontend Engineer", or descriptions containing "frontend" will match.

//https://chatgpt.com/c/67988bc5-3c34-8012-8bb2-15d1ad2c583e
        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1});
        // ihave given company Id of amazon in body for(company:) so populate method take that id that it gives details of that company based on Id provided    
        if(!jobs)
        {
            return res.status(404).json({
                message:"Jobs not found",
                success:false
            })
        }
        
        return res.status(200).json({
            jobs,
            success:true
        })

    }
    catch(error)
    {
        console.log(error);
    }
}

export const getJobById = async(req,res)=>{
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if(!job)
        {
            return res.status(404).json({
                message:"Jobs not found",
                success:false
            })
        }
        return res.status(200).json({
            job,
            success:true
        })

    }
    catch(error)
    {

        console.log(error);
    }
}

// above all functions are for jobseeekers

// this is for admin

// admin kitne jobs create kara

// export const getadmincreatedjobs = async(req,res)=>{
//     try{
//         const adminId = req.id;
//         const jobs = await Job.find({created_by:adminId}).populate({
//             path:'company',created:-1
//         })
//         // if there are two admins for a company if two of them created some jobs if they want how jobs there were created so two of them will have diff userId by using that they can find
//         if(!jobs)
//         {
//                 return res.status(404).json({
//                     message:"Jobs not found",
//                     success:false
//                 })
//         }   
//         return res.status(200).json({
//             jobs,
//             success:true
//         })

//     }
//     catch(error)
//     {
//         console.log(error);
//     }
// }


export const getadmincreatedjobs = async (req, res) => {
    try {
        const adminId = req.id;

        const jobs = await Job.find({ created_by: adminId })
            .sort({ createdAt: -1 }) // Sorting jobs by newest
            .populate('company'); // Populating company details

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error("Error in getadmincreatedjobs:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
