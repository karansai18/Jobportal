import React from 'react'

import { Popover,PopoverContent,PopoverTrigger} from '../ui/popover'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '../ui/button';
import { LogOut, User2 } from 'lucide-react';
import { Link } from 'react-router-dom';

// import { PopoverContent, PopoverTrigger} from '@radix-ui/react-popover'
// import {Button } from '@radix-ui/react-button'

const Navbar = () => {
    const user=false;
  return (
    <div className='bg-white'>
        <div className='flex items-center justify-between h-16 mx-auto max-w-7xl '>
            <div>
                <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
            </div>
            <div className="flex items-center gap-5">
                <ul className="flex items-center gap-8 ml-15 font-meduim">
                    <li>Home</li>
                    <li>Jobs</li>
                    <li>Browser</li>
                </ul> 
                {
                    !user?
                    (
                        <div className="flex items-center gap-2"> 
                            <Link to="/login">
                               <Button variant="outline">Login</Button>
                            </Link>
                            <Link to="/signup">
                               <Button className="bg-[#6A38c2] hover:bg-[#5b30a6]">SignUp</Button>
                            </Link>

                        </div>
                    ):
                    (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="w-12 h-12 ml-5 rounded-full"/>
                                    
                                </Avatar>
        
                                
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="flex gap-4 space-y-0.9">
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="w-12 h-12 ml-5 rounded-full"/>
                                        
                                    </Avatar>
                                    <div>
                                    <h4 className='font-medium'>Karan sai</h4>
                                    <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet.</p>
                                    </div>
                                
                                </div>
                                <div className="flex flex-col text-gray-600">
                                    <div className="flex items-center gap-2 w-fit curser-pointer">
                                        <User2/>
                                        <Button variant="link">View Profile</Button>
                                    </div>
                                    <div className="flex items-center gap-2 w-fit curser-pointer">
                                        <LogOut/>
                                        <Button variant="link">Logout</Button>
                                    </div>
                                
                                </div>
                                
                            </PopoverContent>
                        </Popover>


                    )
                }
                
               

            </div>  
           
        </div>
       
    </div>
  )
}

export default Navbar   