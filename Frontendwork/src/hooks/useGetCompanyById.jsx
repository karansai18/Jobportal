import { useEffect } from 'react'; 
import { useDispatch } from 'react-redux';
import { COMPANY_API_END_POINT } from '../axiosk/constant.js';
import { setSingleCompany } from '../redux/CompanySlice.js';
import axios from 'axios';

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchSingleCompany= async()=>{
            try{
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials:true});
                if(res.data.success)
                {
                    dispatch(setSingleCompany(res.data.company))
                }
            }
            catch(error)
            {
                console.log(error);
            }
            
        }
        fetchSingleCompany();

    },[companyId,dispatch])
  return (
    <div>useGetCompanyById</div>
  )
}

export default useGetCompanyById