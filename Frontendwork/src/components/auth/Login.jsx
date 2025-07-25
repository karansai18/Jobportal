
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { RadioGroup } from '@radix-ui/react-radio-group'
import {RadioGroupItem} from '@radix-ui/react-radio-group'
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios'; 
import { toast } from 'sonner'
import { USER_API_END_POINT } from '../../axiosk/constant.js'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { setLoading,setUser } from '../../redux/authSlice'


const Login = () => {
  const [input, setInput] = useState({
      email: "",
      password: "",
      role: "",
  });
  const { loading,user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
      setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
      e.preventDefault();
      console.log(input);
      try {
          dispatch(setLoading(true));
          const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
              headers: {
                  "Content-Type": "application/json"
              },
              withCredentials: true,
          });
          if (res.data.success) {
              dispatch(setUser(res.data.user));
              navigate("/");
              toast.success(res.data.message);
          }
      } 
      catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    }
    
      finally {
          dispatch(setLoading(false));
      }
  }
  useEffect(()=>{
      if(user){
          navigate("/");
      }
  },[])
  return (
      <div>
          <Navbar />
          <div className='flex items-center justify-center mx-auto max-w-7xl'>
              <form onSubmit={submitHandler} className='w-1/2 p-4 my-10 border border-gray-200 rounded-md'>
                  <h1 className='mb-5 text-xl font-bold'>Login</h1>
                  <div className='my-2'>
                      <Label>Email</Label>
                      <Input
                          type="email"
                          value={input.email}
                          name="email"
                          onChange={changeEventHandler}
                          placeholder="hello@gmail.com"
                      />
                  </div>

                  <div className='my-2'>
                      <Label>Password</Label>
                      <Input
                          type="password"
                          value={input.password}
                          name="password"
                          onChange={changeEventHandler}
                          placeholder="hello@gmail.com"
                      />
                  </div>
                  <div className='flex items-center justify-between'>
                      <RadioGroup className="flex items-center gap-4 my-5">
                          <div className="flex items-center space-x-2">
                              <Input
                                  type="radio"
                                  name="role"
                                  value="student"
                                  checked={input.role === 'student'}
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
                                  checked={input.role === 'recruiter'}
                                  onChange={changeEventHandler}
                                  className="cursor-pointer"
                              />
                              <Label htmlFor="r2">Recruiter</Label>
                          </div>
                      </RadioGroup>
                  </div>
                  {
                      loading ? <Button className="w-full my-4"> <Loader2 className='w-4 h-4 mr-2 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Login</Button>
                  }
                  <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
              </form>
          </div>
      </div>
  )
}


export default Login