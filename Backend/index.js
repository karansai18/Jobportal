import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
// import cookieParser from "cookie-parser";
// const express = require('express')
import cors from 'cors';
// const cors = require('cors');

import { config } from 'dotenv';
import connectDB from './utils/db.js';
import userroutes from "./routes/userroutes.js";
import companyroutes from './routes/companyroutes.js'
import jobroutes from './routes/jobrouter.js';
import applicationroutes from './routes/applicationroutes.js';
config({});   
const app = express();
const corsOptions = {
    origin: function(origin, callback) {
        callback(null, true);
    },
    credentials: true,
};
// const corsOptions = {
//     origin: ["http://localhost:5173"],  // Only allow frontend to access
//     credentials: true,                  // Allow cookies
// };
app.use(cors(corsOptions));


app.use(cookieParser());
app.use(json());
app.use(urlencoded({extended:true}));
app.use(cors(corsOptions));

app.get("/home",(req,res)=>{
    return res.status(200).json({
        message:"I am coding from Backend",
        success:true
    })
})

//  middleware





// const port = 3000;
const port = process.env.PORT || 5000
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