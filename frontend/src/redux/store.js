import { configureStore } from "@reduxjs/toolkit"
import bookListReducers from "./BookListSlice"

const libraryStore = configureStore({
    reducer :{
        bookList : bookListReducers
    }

});

export default libraryStore