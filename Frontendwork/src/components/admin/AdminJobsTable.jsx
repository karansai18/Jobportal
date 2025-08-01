import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    // const { companies, searchJobByText } = useSelector(store => store.company);
    const {allAdminJobs,searchJobByText}= useSelector(store=>store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();
    useEffect(()=>{
        // const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
        //     if(!searchCompanyByText){
        //         return true
        //     };
        //     return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        // });
        const filteredJobs = Array.isArray(allAdminJobs) ? allAdminJobs.filter((job) => {
           if (!searchJobByText) return true;
           return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());;
}) : [];

        setFilterJobs(filteredJobs);  
    },[allAdminJobs,searchJobByText])
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent posted Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>CompanyName</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
  {filterJobs?.map((job) => (
    <TableRow key={job._id}>
      <TableCell>{job?.company?.name}</TableCell>
      <TableCell>{job?.title}</TableCell>
      <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
      <TableCell className="text-right cursor-pointer">
        <Popover>
          <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
          <PopoverContent className="w-32">
            <div onClick={() => navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 cursor-pointer w-fit'>
              <Edit2 className='w-4' />
              <span>Edit</span>
            </div>
            <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)}className='flex items-center gap-2 mt-2 cursor-pointer w-fit' >
              <Eye className='w-4'/>
              <span>Applicants</span> 
            </div>
          </PopoverContent>
        </Popover>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

            </Table>
        </div>
    )
}

export default AdminJobsTable;