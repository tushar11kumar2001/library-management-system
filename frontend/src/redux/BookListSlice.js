import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const SearchBooksThunk = createAsyncThunk("SearchBooksThunk", async (bookName)=>{
       const searchBooksResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/book?search=1&name=${bookName}`);
       return { searchBooksData : searchBooksResponse.data.data }
});

export const BookListThunk = createAsyncThunk("BookListThunk", async()=>{
       const allBookResponse =  await axios.get(`${import.meta.env.VITE_BASE_URL}/book?category=all`);
       const topChoiceBookResponse =  await axios.get(`${import.meta.env.VITE_BASE_URL}/book?category=top`);
       return { 
        allBookData : allBookResponse.data.data,
        topChoiceBookData : topChoiceBookResponse.data.data
     };

});
const BookListSlice = createSlice({
    name : "BookListSlice",
    initialState : {
        allBooks : [],
        topChoiceBooks : [],
        searchBooks : []
    },
    reducers : {
        getAllBooks : (state, payload)=>{
             state.allBooks = [1,2,3,4,5];
        },
        emptySearchBooks : (state, payload)=>{
            state.searchBooks = [];
        }
    },
    extraReducers : (builder)=>{
        builder.addCase(BookListThunk.fulfilled, (state, action)=>{
               state.allBooks = action.payload.allBookData;
               state.topChoiceBooks = action.payload.topChoiceBookData;
        });
        builder.addCase(SearchBooksThunk.fulfilled, (state, action)=>{
                state.searchBooks = action.payload.searchBooksData;
        })
    }
});

export const { getAllBooks, emptySearchBooks } = BookListSlice.actions;
export default BookListSlice.reducer;