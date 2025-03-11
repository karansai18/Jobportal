import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { AvatarImage,Avatar } from '@radix-ui/react-avatar'
import { Badge } from './ui/badge'
const Job = () => {
  return (
    <div className='p-5 bg-white border border-gray-100 rounded-md shadow-xl'>
        <div className='flex justify-between flex-items-center'>
            <p className='text-sm text-gray-500'>2 days ago</p>
            <Button variant="outline" className='rounded-full' size="icon "><Bookmark/></Button>
        </div>
       
        <div className='flex-col items-center gap-2 my-2'>
            <Avatar>
               <AvatarImage src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBobUVyPC8AItHWrndN1zMfjljkzpkEMricw&s' className='w-auto h-10 mt-4 ml-5' />
            </Avatar>
            <div>
                <h1 className='text-lg font-medium'>
                  CompanyName   
                </h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='my-2 text-lg font-bold '>Title</h1>
                <p className='text-sm text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod, facilis.</p>
            </div>
            
            <div className='flex items-center gap-4 mt-6'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">12 positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">PartTime</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">24LPA</Badge>
            </div>
            <div className='flex gap-3 mt-3'>
                <Button variant ="outline">Details</Button>
                <Button className='bg-[#7209b7] '>Save for Later </Button>
            </div>
           
        </div>
    </div>
  )
}

export default Job