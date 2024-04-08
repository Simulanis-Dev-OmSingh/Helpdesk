import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    adminData : {

    }
}

export const adminSlice = createSlice({
    name : "admin",
    initialState,
    reducers:{
        saveAdminDetails : (state,action)=>{
            const adminDetails = action.payload
            state.adminData = adminDetails
        },
        logout : (state , action) =>{
            const adminDetails = action.payload
            state.adminData = adminDetails
        }
    }
})

export const {saveAdminDetails  , logout} = adminSlice.actions

export default adminSlice.reducer