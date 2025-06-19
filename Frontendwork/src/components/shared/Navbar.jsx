import React from "react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";
// import { useSelector } from 'react-redux';
import { USER_API_END_POINT } from "../../axiosk/constant.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "../../redux/authSlice";

// import { PopoverContent, PopoverTrigger} from '@radix-ui/react-popover'
// import {Button } from '@radix-ui/react-button'

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    // const user = true;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        }
    };

    return (
        <div className="bg-white">
            <div className="flex items-center justify-between h-16 mx-auto max-w-7xl ">
                <div>
                    <h1 className="text-2xl font-bold">
                        Job<span className="text-[#F83002]">Portal</span>
                    </h1>
                </div>
                <div className="flex items-center gap-5">
                    <ul className="flex items-center gap-8 ml-15 font-meduim">
                        {user && user.role === "recruiter" ? (
                            <>
                                <li>
                                    <Link to="/admin/companies">Companies</Link>
                                </li>
                                <li>
                                    <Link to="/admin/jobs">Jobs</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/jobs">Jobs</Link>
                                </li>
                                <li>
                                    <Link to="/browse">Browse</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    {!user ? (
                        <div className="flex items-center gap-2">
                            <Link to="/login">
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-[#6A38c2] hover:bg-[#5b30a6]">
                                    SignUp
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage
                                        src={user?.profile?.profilePhoto}
                                        alt="@shadcn"
                                        className="w-12 h-12 ml-5 rounded-full"
                                    />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="flex gap-4 space-y-0.9">
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto}
                                            alt="@shadcn"
                                            className="w-12 h-12 ml-5 rounded-full"
                                        />
                                    </Avatar>
                                    <div>
                                        <h4 className="font-medium">{user?.fullname}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            {user?.profile?.bio}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col text-gray-600">
                                {
                                     user && user.role ==='student' && (
                                        <div className="flex items-center gap-2 w-fit curser-pointer">
                                    
                                            (
                                                <User2 />
                                        <Button variant="link">
                                            <Link to="/profile">View Profile</Link>
                                        </Button>
                                            ) 
                                    </div>
                                     )
                                    
                                }
                                    
                                        
                                    
                                    <div className="flex items-center gap-2 w-fit curser-pointer">
                                        <LogOut />
                                        <Button onClick={logoutHandler} variant="link">
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
