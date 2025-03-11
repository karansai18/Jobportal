
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { RadioGroup } from '@radix-ui/react-radio-group'
import {RadioGroupItem} from '@radix-ui/react-radio-group'
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'; 
import { toast } from 'sonner'


import React from 'react'
import { useDispatch } from 'react-redux'


const Login = () => {
  
  const [input,setInput] = useState({
      
      email:"",
      password:"",
      role:"",
      
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const changeEventHandler = (e)=>
    {
      setInput({...input,[e.target.name]:e.target.value});
    }
  
    const submitHandler=async(e)=>
      {
         e.preventDefault();
         console.log(input);
       
      
        try{
          dispatch(setLoading(true));
          const res = await axios.post(`${USER_API_END_POINT}/login`,input,{
            headers:{
              "Content-Type":"application/json"
            },
            withCredentails:true
          }) 
          if(res.data.success)
          {
            navigate("/");
              
            toast.success(res.data.message);
          }
        }
        //axios.post(`${USER_API_END_POINT}
        //axios.post(`${USER_API_END_POINT}/register`
        catch(error)
        {
          console.log(error);
          toast.error(error.response.data.message);
        }
        finally{
          dispatch(setLoading(false));
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
                   <Label>Email</Label>
                   <Input type="email" 
                     name="email" 
                     placeholder="karanbonagiri@gmail.com"
                     value={input.email}
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

                   
                </div>
 
                <Button type="submit" className="w-full my-4">Login</Button>
                <span>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
            </form>
        </div>
    </div>
       
    
   
    
  )
}

export default Login