import { configureStore } from "@reduxjs/toolkit";
import userSlice from './reduxSlices/userSlice'
import allUsersSlice from './reduxSlices/allUsersSlice'

const store = configureStore({
    reducer: {
        user:userSlice,
        allUsers:allUsersSlice
    }
})

export default store