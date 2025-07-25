
// import React, { useState } from 'react'
// import Navbar from './shared/Navbar'
// import { Avatar, AvatarImage } from './ui/avatar'
// import { Button } from './ui/button'
// import { Contact, Mail, Pen } from 'lucide-react'
// import { Badge } from './ui/badge'
// import { Label } from './ui/label'
// import AppliedJobTable from './AppliedJobTable'
// import UpdateProfile from './UpdateProfile'
// import { useSelector } from 'react-redux'
// // import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

// // const skills = ["Html", "Css", "Javascript", "Reactjs"]
// const isResume = true;

// const Profile = () => {
//     // useGetAppliedJobs();
//     const [open, setOpen] = useState(false);
//     const {user} = useSelector(store=>store.auth);
//     console.log({user});

//     return (
//         <div>
//             <Navbar />
//             <div className='max-w-4xl p-8 mx-auto my-5 bg-white border border-gray-200 rounded-2xl'>
//                 <div className='flex justify-between'>
//                     <div className='flex items-center gap-4'>
//                         <Avatar className="w-24 h-24">
//                             <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
//                         </Avatar>
//                         <div>
//                             <h1 className='text-xl font-medium'>{user?.fullname}</h1>
//                             <p>{user?.profile?.bio}</p>
//                         </div>
//                     </div>
//                     <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
//                 </div>
//                 <div className='my-5'>
//                     <div className='flex items-center gap-3 my-2'>
//                         <Mail />
//                         <span>{user?.email}</span>
//                     </div>
//                     <div className='flex items-center gap-3 my-2'>
//                         <Contact />
//                         <span>{user?.phoneNumber}</span>
//                     </div>
//                 </div>
//                 <div className='my-5'>
//                     <h1>Skills</h1>
//                     <div className='flex items-center gap-1'>
//                         {
//                             user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
//                         }
//                     </div>
//                 </div>
//                 <div className='grid w-full max-w-sm items-center gap-1.5'>
//                     <Label className="font-bold text-md">Resume</Label>
//                     {
//                         isResume ? <a target='blank' href={user?.profile?.resume} className='w-full text-blue-500 cursor-pointer hover:underline'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
//                     }
//                 </div>
//             </div>
//             <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
//                 <h1 className='my-5 text-lg font-bold'>Applied Jobs</h1>
//                 {/* Applied Job Table   */}
//                 <AppliedJobTable />
//             </div>
//             <UpdateProfile open={open} setOpen={setOpen}/>
//         </div>
//     ) 
// }

// export default Profile


import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfile from './UpdateProfile'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '../hooks/useGetAppliedJobs' // Import the new hook
import AutoApplyButton from './AutoApplyButton'; // Import the new component

const Profile = () => {
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const refetchAppliedJobs = useGetAppliedJobs(); // Use the hook

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl p-8 mx-auto my-5 bg-white border border-gray-200 rounded-2xl'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="w-24 h-24">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='text-2xl font-bold'>{user?.fullname}</h1>
                            <p className='text-gray-500'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phonenumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className='font-bold text-md'>Skills</h1>
                    <p className='text-xs text-gray-500'>Skills are automatically extracted from your resume.</p>
                    <div className='flex flex-wrap items-center gap-2 my-2'>
                        {
                            user?.profile?.skills && user.profile.skills.length > 0
                                ? user.profile.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
                                : <span>No skills found. Upload a resume to add skills.</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="font-bold text-md">Resume</Label>
                    {
                        user?.profile?.resume
                            ? <a target='_blank' rel="noreferrer" href={user?.profile?.resume} className='w-full text-blue-500 cursor-pointer hover:underline'>{user?.profile?.resumeOriginalName}</a>
                            : <span>NA</span>
                    }
                </div>

                {/* Pass the refetch function to the button */}
                <AutoApplyButton onSuccess={refetchAppliedJobs} />

            </div>
            <div className='max-w-4xl p-8 mx-auto bg-white border border-gray-200 rounded-2xl'>
                <h1 className='my-5 text-xl font-bold'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfile open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile;