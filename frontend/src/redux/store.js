import { configureStore } from "@reduxjs/toolkit"
import bookReducers from "./BookSlice"
import userReducers from "./UserSlice"

const libraryStore = configureStore({
    reducer :{
        bookList : bookReducers,
        userList : userReducers
    }

});

export default libraryStore