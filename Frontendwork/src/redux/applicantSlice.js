import { createSlice } from "@reduxjs/toolkit";
const applicantSlice = createSlice({
    name:'application',
    initialState:{
        applicants:null,
    },
    reducers:{
        setAllApplicants:(state,action) => {
            state.applicants = action.payload;
        } 
    }
});
export const {setAllApplicants} = applicantSlice.actions;
export default applicantSlice.reducer;