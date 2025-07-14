import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { AvatarImage,Avatar } from '@radix-ui/react-avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
const Job = ({job}) => {
    const navigate = useNavigate();
    // const jobId = "jdnscmmvccvcv";
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
  return (
    <div className='p-5 bg-white border border-gray-100 rounded-md shadow-xl'>
        <div className='flex justify-between flex-items-center'>
            <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
            <Button variant="outline" className='rounded-full' size="icon "><Bookmark/></Button>
        </div>
       
        <div className='flex-col items-center gap-2 my-2'>
            <Avatar>
               <AvatarImage src={job?.company?.logo} className='w-auto h-10 mt-4 ml-5' />
            </Avatar>
            <div>
                <h1 className='text-lg font-medium'>
                   {job?.company?.name ?? job?.company}
                </h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='my-2 text-lg font-bold '>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            
            <div className='flex items-center gap-4 mt-6'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary} LPA</Badge>
            </div>
            <div className='flex gap-3 mt-3'>
                <Button onClick={()=>navigate(`/description/${job?._id}`)} variant ="outline">Details</Button>
                <Button className='bg-[#7209b7] '>Save for Later </Button>
            </div>
           
        </div>
    </div>
  )
}

export default Job