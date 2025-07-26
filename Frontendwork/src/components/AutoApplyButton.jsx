import React, { useState } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { Loader2, Rocket } from 'lucide-react';
import { USER_API_END_POINT } from '../axiosk/constant';
import { toast } from 'sonner';

const AutoApplyButton = ({ onSuccess }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleAutoApplyClick = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(
                `${USER_API_END_POINT}/profile/auto-apply`,
                {},
                { withCredentials: true }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                onSuccess(); // This will refetch the applied jobs list
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "An unexpected error occurred.";
            toast.error(errorMessage);
            console.error("Auto-apply error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='my-5 p-6 bg-gray-50 border border-gray-200 rounded-lg text-center'>
            <h3 className='font-bold text-lg'>Automated Job Application</h3>
            <p className='text-sm text-gray-600 my-2'>
                Let our AI find and apply to jobs that match the skills on your resume.
            </p>
            {
                isLoading ? (
                    <Button className="w-full my-2" disabled>
                        <Loader2 className='w-4 h-4 mr-2 animate-spin' /> Scanning for jobs...
                    </Button>
                ) : (
                    <Button onClick={handleAutoApplyClick} className="w-full my-2 bg-[#7209b7] hover:bg-[#5f32ad]">
                        <Rocket className='w-4 h-4 mr-2' /> Start Auto-Applying
                    </Button>
                )
            }
        </div>
    );
};

export default AutoApplyButton;