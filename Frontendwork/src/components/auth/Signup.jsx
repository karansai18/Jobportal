
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { RadioGroup } from '@radix-ui/react-radio-group'
import {RadioGroupItem} from '@radix-ui/react-radio-group'
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import React from 'react'
// import axios from 'axios'
// import { USER_API_END_POINT } from 'axiosk/constant'
import {USER_API_END_POINT} from  '../../axiosk/constant.js'
import axios from 'axios'; 
import { toast } from 'sonner'



const Signup = () => {
  const [input,setInput] = useState({
    fullname:"",
    email:"",
    phonenumber:"",
    password:"",
    role:"",
    file:""
  });
  const navigate = useNavigate();
  const changeEventHandler = (e)=>
  {
    setInput({...input,[e.target.name]:e.target.value});
  }

  const changeFileHandler=(e)=>
  {
    setInput({...input,file:e.target.files?.[0]});
  }
  const submitHandler=async(e)=>
  {
     e.preventDefault();
     console.log(input);
    const formData = new FormData();
    formData.append("fullname",input.fullname);
    formData.append("email",input.email);
    formData.append("phonenumber",input.phonenumber);
    formData.append("password",input.password);
    formData.append("role",input.role);
    if(input.file)
    {
      formData.append("file",input.file);
    }

    try{
      const res =await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // Corrected
      });
      
      if(res.data.success)
      {
        navigate("/login");
        toast.success(res.data.message)
          
        
      }
    }
   
    catch(error) {
      console.log(error); // Debugging: check the full error object
  
      if (error.response) {
          toast.error(error.response.data.message);
      } else if (error.request) {
          toast.error("No response received from the server.");
      } else {
          toast.error("An unexpected error occurred.");
      }
  }
  } 

  
  return (
    <div>
        <div>
           <Navbar/>
        </div>

        <div className="flex items-center justify-center mx-auto max-w-7xl">
            <form onSubmit={submitHandler} className='w-1/2 p-4 my-10 border border-gray-200 rounded-md'>
                <h1 className="mb-5 text-xl font-bold">Sign Up</h1>

                <div className="gap-5 my-2">
                   <Label>Fullname</Label>
                   <Input 
                      type="text" 
                      value={input.fullname}
                      name="fullname"
                      placeholder="karan"
                      onChange={changeEventHandler}/>
                  
                </div>

                <div className="gap-5 my-2">
                   <Label>Email</Label>
                   <Input 
                     type="email" 
                     name="email" 
                     placeholder="karanbonagiri@gmail.com"
                     value={input.email}
                     onChange={changeEventHandler}

                     />
                  
                </div>

                <div className="gap-5 my-2">
                   <Label>Phone Number</Label>
                   <Input 
                      type="text"
                      name="phonenumber"
                      placeholder="1234567890"
                      value={input.phonenumber}
                      onChange={changeEventHandler}
                    />
                  
                </div>

                <div className="gap-5 my-2">
                   <Label>Password</Label>
                   <Input 
                      type="password" 
                      name="password"
                      value={input.password}
                      onChange={changeEventHandler}
                  />
                  
                </div>

                <div className='flex items-center justify-between'>
                    
                    <RadioGroup className="flex items-center gap-4 my-5">
                          <div className="flex items-center space-x-2">
                              <Input 
                                type="radio" 
                                name="role" 
                                value="student" 
                                checked={input.role==='student'}
                                onChange={changeEventHandler}
                                className="cursor-pointer"
                              />
                              <Label htmlFor="r1">Student</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                              <Input 
                                 type="radio" 
                                 name="role" 
                                 value="recruiter"
                                 checked={input.role==='recruiter'}
                                 onChange={changeEventHandler} 
                                 className="cursor-pointer"
                                 />
                              <Label htmlFor="r2">Recruiter</Label>
                          </div>
                          
                    </RadioGroup>

                    <div className='flex items-center gap-2'>
                       <Label>Profile</Label>
                       <Input 
                          accept="image/*" 
                          type="file" 
                          onChange={changeFileHandler}
                          className="cursor-pointer"
                        />
                    </div> 

                </div>
 
                <Button type="submit" className="w-full my-4">Signup</Button>
                <span>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
            </form>
        </div>
    </div>
       
    
   
    
  )
}

export default Signup