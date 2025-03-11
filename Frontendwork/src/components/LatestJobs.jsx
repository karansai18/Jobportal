    import React from 'react'
    import LatestJobCards from './LatestJobCards';
    
    const randomJobs =[1,2,3,4,5,6,7,8];
    const LatestJobs = () => {
    return (
        <div className='mx-auto my-20 max-w-7xl'>
            <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & top</span>Job Opening</h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
            {
                randomJobs.map((item,index)=><LatestJobCards key={index}/>)
            }
            </div>
        </div>
    )
    }

    export default LatestJobs