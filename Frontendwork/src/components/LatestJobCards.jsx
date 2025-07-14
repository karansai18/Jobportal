import React from 'react'
import { Badge } from './ui/badge'

const LatestJobCards = ({job}) => {
  return (
    <div className='p-5 bg-white border border-gray-100 rounded-md shadow-xl cursor-pointer'>
        <div>
          <h1 className='text-lg font-medium'>{job?.company?.name ?? job?.company}</h1>
          <p className='text-sm text-gray-500'>India</p>
        </div>
        <div>
            <h1 className='my-2 text-lg font-bold'>{job?.title}</h1>
            <p className='text-sm text-gray-500'>{job?.description}</p>
        </div>
 
        <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary} Lpa</Badge>
        </div>

    </div>
  ) 
}

export default LatestJobCards