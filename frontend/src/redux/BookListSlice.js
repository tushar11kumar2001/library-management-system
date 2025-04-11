import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const SearchBooksThunk = createAsyncThunk(
  "SearchBooksThunk",
  async (bookName) => {
    const searchBooksResponse = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/book?search=1&name=${bookName}`
    );
    return { searchBooksData: searchBooksResponse.data.data };
  }
);

export const allBookListThunk = createAsyncThunk(
  "allBookListThunk",
  async (limit) => {
    const allBookResponse = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/book?category=all&limit=${limit}`
    );
    return { allBookData: allBookResponse.data.data };
  }
);
export const topChoiceBookListThunk = createAsyncThunk(
  "topChoiceBookListThunk",
  async (limit) => {
    const topChoiceBookResponse = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/book?category=top`
    );
    return { topChoiceBookData: topChoiceBookResponse.data.data };
  }
);
const BookListSlice = createSlice({
  name: "BookListSlice",
  initialState: {
    allBooks: [],
    topChoiceBooks: [],
    searchBooks: [],
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
  },
});

export const { getAllBooks, emptySearchBooks } = BookListSlice.actions;
export default BookListSlice.reducer;
