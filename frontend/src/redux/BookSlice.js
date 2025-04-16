import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const SearchBooksThunk = createAsyncThunk(
  "SearchBooksThunk",
  async (bookName) => {
    const searchBooksResponse = await axios.get(
      `/book?search=1&name=${bookName}`
    );
    return { searchBooksData: searchBooksResponse.data.data };
  }
);
export const allBookListThunk = createAsyncThunk(
  "allBookListThunk",
  async (limit) => {
    const allBookResponse = await axios.get(
      `/book?category=all&limit=${limit}`
    );
    return { allBookData: allBookResponse.data.data };
  }
);
export const topChoiceBookListThunk = createAsyncThunk(
  "topChoiceBookListThunk",
  async (limit) => {
    const topChoiceBookResponse = await axios.get(
      `/book?category=top`
    );
    return { topChoiceBookData: topChoiceBookResponse.data.data };
  }
);
export const BorrowedBookListThunk = createAsyncThunk(
  "BorrowedBookListThunk",
  async (limit) => {
    const borrowedBookResponse = await axios.get(
      `/book?category=borrow`
    );
    return { borrowedBookData: borrowedBookResponse.data.data };
  }
);
const BookSlice = createSlice({
  name: "BookSlice",
  initialState: {
    allBooks: [],
    topChoiceBooks: [],
    searchBooks: [],
    borrowedBooks : []
  },
  reducers: {
    getAllBooks: (state, payload) => {
      state.allBooks = [1, 2, 3, 4, 5];
    },
    emptySearchBooks: (state, payload) => {
      state.searchBooks = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(allBookListThunk.fulfilled, (state, action) => {
      state.allBooks = action.payload.allBookData;
    });
    builder.addCase(topChoiceBookListThunk.fulfilled, (state, action) => {
      state.topChoiceBooks = action.payload.topChoiceBookData;
    });
    builder.addCase(SearchBooksThunk.fulfilled, (state, action) => {
      state.searchBooks = action.payload.searchBooksData;
    });
    builder.addCase(BorrowedBookListThunk.fulfilled, (state, action) => {
      state.borrowedBooks = action.payload.borrowedBookData;
    });
  },
});

export const { getAllBooks, emptySearchBooks } = BookSlice.actions;
export default BookSlice.reducer;
