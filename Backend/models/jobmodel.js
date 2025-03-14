import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:[{
        type:String,
        
    }],
    salary:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    position:{
        type:Number,
        required:true
    },
    company:{  // realtion b/w job and company
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },
    created_by:{  //created by user
        type:mongoose.Schema.Types.ObjectId,
        ref:'User', ///////////
        required:true
    },
    applications:[
    {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Applications',

    }],
    experienceLevel:{
        type:Number,
        require:true

    }
    
},{timestamps:true});
export const Job = mongoose.model("Job",jobSchema);