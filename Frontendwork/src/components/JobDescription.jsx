import React, { useEffect,useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import {setSingleJob} from '../redux/JobSlice'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { JOB_API_END_POINT } from '../axiosk/constant.js';
import {APPLICATION_API_END_POINT} from '../axiosk/constant.js'

import { toast } from 'sonner'

const JobDescription = () => 
{
    const {singleJob} = useSelector(store=>store.job);
    const {user} = useSelector(store=>store.auth);
    const isInitiallyAppiled=singleJob?.applications?.some(application=>application.applicant === user?._id)|| false;
    //application is an array and applicant is id of each index 
    const [isApplied,setIsApplied] = useState(isInitiallyAppiled);
    const params = useParams();
    const jobId =  params.id;
    
    const dispatch =  useDispatch();


    const applyJobHandler = async () => 
    {
        try 
        {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            console.log(res.data);
            
            if(res.data.success)
            { 
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]} // updtates totalApplicants when apply job is clicked
                dispatch(setSingleJob(updatedSingleJob));// helps us to real time UI update
                toast.success(res.data.message);

            }
        } 
        catch (error) 
        {
                console.log(error);
                toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
        }
    }
   

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try 
            {
                const res = await axios.get(`${JOB_API_END_POINT}/getjobs/${jobId}`,{withCredentials:true});
                console.log(res);
                if(res.data.success)
                {
                    dispatch(setSingleJob(res.data.job));
                } 
            } 
            catch (error) 
            {
                console.log(error);
            }  
        }
        fetchSingleJob();
    },[jobId,dispatch,user?._id])

  return (
    <div className='mx-auto my-10 max-w-7xl'>
        <div className='flex items-center justify-between'>
                <div>
                        <h1 className='text-xl font-bold '>{singleJob?.title}</h1>
                        <div className='flex items-center gap-4 mt-4'>
                            <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob?.position} positions</Badge>
                            <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                            <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleJob?.salary} Lpa</Badge>
                        </div>
                </div>
                <div>
                <Button
                     onClick={isApplied?null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button> 
                </div>
        </div>

        <h1 className='py-4 font-medium border-b-2 border-b-gray-300'>Job Description</h1>
        <div className='my-4'>
            <h1 className='my-1 font-bold'>Role:<span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
            <h1 className='my-1 font-bold'>Location:<span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
            <h1 className='my-1 font-bold'>Description:<span className='pl-4 font-normal text-gray-800'>{singleJob?.description}.</span></h1>
            <h1 className='my-1 font-bold'>Experience:<span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel}</span></h1>
            <h1 className='my-1 font-bold'>Salary:<span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}</span></h1>
            <h1 className='my-1 font-bold'>Total Applicants:<span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
            <h1 className='my-1 font-bold'>Posted Date:<span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
        </div>
        

    </div>
  )
}

export default JobDescription