import { setAllJobs } from '../redux/JobSlice'
import { JOB_API_END_POINT } from '../axiosk/constant.js'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const GetAllJobs = () => {
    const dispatch = useDispatch();
  
    useEffect(()=>{
        const fetchAllJobs = async () => {
            try 
            {
                const res = await axios.get(`${JOB_API_END_POINT}/getjobs`,{withCredentials:true});
                if(res.data.success)
                {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }  
        }
        fetchAllJobs();
    },[])
}

export default GetAllJobs