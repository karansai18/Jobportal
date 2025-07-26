import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
// import cookieParser from "cookie-parser";
// const express = require('express')
import cors from 'cors';
// const cors = require('cors');

import { config } from 'dotenv';
import connectDB from './utils/db.js';
import userroutes from "./routes/userroutes.js";
import companyroutes from './routes/companyroutes.js';
import jobroutes from './routes/jobrouter.js';
import applicationroutes from './routes/applicationroutes.js';
import dotenv from 'dotenv';
dotenv.config();




config({});   
const app = express();
// const corsOptions = {
//     origin: function(origin, callback) {
//         callback(null, true);
//     },
//     credentials: true,
// };
// app.use(cors(corsOptions));
// const corsOptions = {
//     origin: ["http://localhost:5173"],  // Only allow frontend to access
//     credentials: true,                  // Allow cookies
// };


//  Example Use Case:
// You're building a MERN app:

// Frontend: localhost:3000

// Backend API: localhost:5000

// If you make a fetch or axios request from 3000 to 5000, it’s a cross-origin request. Without CORS enabled on the backend, the browser will block the request.

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));


app.use(cookieParser());
app.use(json());
app.use(urlencoded({extended:true}));


app.get("/home",(req,res)=>{
    return res.status(200).json({
        message:"I am coding from Backend",
        success:true
    })
})

//  middleware





// const port = 3000;
const port = process.env.PORT || 4501;
app.use("/api/v1/user",userroutes);
app.use("/api/v1/company",companyroutes);
app.use("/api/v1/job",jobroutes);
app.use("/api/v1/application",applicationroutes);

// https://localhost:8000/api/v1/user/register
// https://localhost:8000/api/v1/user/login
// https://localhost:8000/api/v1/user/profile/update  

app.listen(port,()=>{
    connectDB();
    console.log(`server running at ${port}`)
})