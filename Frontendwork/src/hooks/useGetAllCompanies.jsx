import { useEffect } from 'react'; 
import { useDispatch } from 'react-redux';
import { COMPANY_API_END_POINT } from '../axiosk/constant.js';
import axios from 'axios';
import { setCompanies } from '../redux/CompanySlice.js';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchCompanies= async()=>{
            try{
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true});
                if(res.data.success)
                {
                    dispatch(setCompanies(res.data.companies)) 
                    //go to backend files and check companycontroller there u will see getcompany there it returns companies    
                } 
            }
            catch(error)
            {
                console.log(error);
            }
            
        }
        fetchCompanies();

    },[])
  return (
    <div>useGetCompanyById</div>
  )
}

export default useGetAllCompanies