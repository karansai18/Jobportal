import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { APPLICATION_API_END_POINT } from '../axiosk/constant';
import { setAllAppliedJobs } from '../redux/JobSlice';

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    const fetchAppliedJobs = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setAllAppliedJobs(res.data.application));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAppliedJobs();
    }, []); // Fetch on initial component mount

    // Return the function so we can call it again manually
    return fetchAppliedJobs;
};

export default useGetAppliedJobs;