import { createSlice } from "@reduxjs/toolkit";

const allUsersSlice = createSlice({
    name: "allUsers",
    initialState: null,
    reducers: {
        addAllUsers : (state,action)=>{
            return action.payload
        }
    }
})

export const{addAllUsers} = allUsersSlice.actions;

export default allUsersSlice.reducer; 