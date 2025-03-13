import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

const JobDescription = () => {
    const isApplied=false;
  return (
    <div className='mx-auto my-10 max-w-7xl'>
        <div className='flex items-center justify-between'>
                <div>
                        <h1 className='text-xl font-bold '>Title</h1>
                        <div className='flex items-center gap-4 mt-4'>
                            <Badge className={'text-blue-700 font-bold'} variant="ghost">12 positions</Badge>
                            <Badge className={'text-[#F83002] font-bold'} variant="ghost">PartTime</Badge>
                            <Badge className={'text-[#7209b7] font-bold'} variant="ghost">24LPA</Badge>
                        </div>
                </div>
                <div>
                <Button
                 
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button> 
                </div>
        </div>

        <h1 className='py-4 font-medium border-b-2 border-b-gray-300'>Job Description</h1>
        <div className='my-4'>
            <h1 className='my-1 font-bold'>Role:<span className='pl-4 font-normal text-gray-800'>FrontendDeveloper</span></h1>
            <h1 className='my-1 font-bold'>Location:<span className='pl-4 font-normal text-gray-800'>Hyderabad</span></h1>
            <h1 className='my-1 font-bold'>Description:<span className='pl-4 font-normal text-gray-800'>Lorem ipsum dolor sit amet.</span></h1>
            <h1 className='my-1 font-bold'>Experience:<span className='pl-4 font-normal text-gray-800'>2yrs</span></h1>
            <h1 className='my-1 font-bold'>Salary:<span className='pl-4 font-normal text-gray-800'>14k</span></h1>
            <h1 className='my-1 font-bold'>Total Applicants:<span className='pl-4 font-normal text-gray-800'>6</span></h1>
            <h1 className='my-1 font-bold'>Posted Date:<span className='pl-4 font-normal text-gray-800'>17-10-2025</span></h1>
        </div>
        

    </div>
  )
}

export default JobDescription   