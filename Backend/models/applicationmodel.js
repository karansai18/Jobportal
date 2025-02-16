    import mongoose from "mongoose";
    // this is for applicatants those who are applying for job
    // konse company me apply kiya aur kisne kiya
    const applicationSchema = new mongoose.Schema({
        job:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Job",
            required:true
            // realtion b/w application and job so that application se job get karthe
        },
        applicant:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        status:
        {
            type:String,
            enum:['pending','accepted','rejected'],
            default:'pending'
        }

    },{timestamps:true});
    export const Application= mongoose.model("Application",applicationSchema);

