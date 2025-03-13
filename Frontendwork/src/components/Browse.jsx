import React from 'react'
import Navbar from './shared/Navbar';
import Job from './Job';
const randomjobs = [1,2,44,4];

const Browse = () => {
  return (
    <div>
        <Navbar/>
        <div className='mx-auto my-10 max-w-7xl'>
          <h1 className='my-10 text-xl font-bold'>Search Results({randomjobs.length})</h1>
          <div className='grid grid-cols-3 gap-4'>
          {
                randomjobs.map((item,index)=>{
                  return (<Job/>)
                })
          } 
          </div>

        </div>
    </div>
  )
}

export default Browse