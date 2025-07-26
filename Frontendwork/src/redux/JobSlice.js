// import { createSlice } from "@reduxjs/toolkit";

// const jobSlice = createSlice({
//     name:"job",
//     initialState:{
//         allJobs:[],
//         allAdminJobs:[],
//         singleJob:null,
//         searchJobByText:"",

       
//     },
//     reducers:
//     {
//         // actions
//         setAllJobs:(state,action) =>
//         {
//             state.allJobs = action.payload;
//         },
//         setSingleJob:(state,action)=>{
//             state.singleJob = action.payload
//         },
//         setAllAdminJobs:(state,action)=>{
//             state.allAdminJobs = action.payload;
//         },
//         setsearchJobByText:(state,action)=>{
//             state.searchJobByText = action.payload;
//         }

       
//     }
// });
// export const {setAllJobs,setSingleJob,setAllAdminJobs,setsearchJobByText } = jobSlice.actions;
// export default jobSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [], // Added this state
    },
    reducers:
    {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setsearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        // Added this reducer
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        }
    }
});
export const { setAllJobs, setSingleJob, setAllAdminJobs, setsearchJobByText, setAllAppliedJobs } = jobSlice.actions;
export default jobSlice.reducer;
