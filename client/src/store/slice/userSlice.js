import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    loading : true,
    userData: null,
    token : null
}

export const userSlice = createSlice({
    name : "userSlice",
    initialState,
    reducers:{
        userData : (state,action)=>{
            state.userData = action.payload;
            state.loading = false;


        },
        userToken : (state,action)=>{
            state.token = action.payload
        },

    }
})

export const { userData, userToken } = userSlice.actions

export default userSlice.reducer;