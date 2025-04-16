import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const UserWithBorrowBookThunk = createAsyncThunk("UserWithBorrowBookThunk", async (limit)=>{
    const userwithBorrowedBookResponse = await axios.get(`/user/system/withborrowedbooks?limit=${limit}`);
    return {  userwithBorrowedBookData : userwithBorrowedBookResponse.data.data }
     
})
export const UserSliceThunk = createAsyncThunk("UserSliceThunk", async ()=>{
    const totalUserResponse = await axios.get(`/user/system/total`);
    const activeUserResponse = await axios.get(`/user/system/active?day=7`);
    const newUserResponse = await axios.get(`/user/system/new?day=7`);

    return { 
        totalUserData : totalUserResponse.data.data,
        activeUserData : activeUserResponse.data.data,
        newUserData : newUserResponse.data.data,
     };
})
const UserSlice = createSlice({
    name : "UserSlice",
    initialState : {
       totalUsers : [],
       activeUsers : [],
       newUsers : [],
       userwithBorrowedBook : []
    },
    reducers : {

    },
    extraReducers : (builder)=>{
        builder.addCase(UserSliceThunk.fulfilled, (state, action)=>{
             state.totalUsers = action.payload.totalUserData;
             state.activeUsers = action.payload.activeUserData;
             state.newUsers = action.payload.newUserData;
       
        });
          builder.addCase(UserWithBorrowBookThunk.fulfilled, (state, action)=>{
             state.userwithBorrowedBook = action.payload.userwithBorrowedBookData;
        })

    }
});

export default UserSlice.reducer; 