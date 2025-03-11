import React from 'react'
import { Badge } from './ui/badge'

const LatestJobCards = () => {
  return (
    <div className='p-5 bg-white border border-gray-100 rounded-md shadow-xl cursor-pointer'>
        <div>
            <h1 className='my-2 text-lg font-bold'>Job Title</h1>
            <p className='text-sm text-gray-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis, sequi!</p>
        </div>
 
        <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">12 Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">Part Time</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">24LPA</Badge>
        </div>

    </div>
  ) 
}

export default LatestJobCards