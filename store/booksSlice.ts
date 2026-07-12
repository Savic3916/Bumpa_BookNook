import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addBookToFirestore,
  Book,
  BookData,
  fetchBooksFromFirestore,
} from "../lib/booksApi";

interface BooksState {
  items: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  return await fetchBooksFromFirestore();
});

export const addBook = createAsyncThunk(
  "books/addBook",
  async (newBook: BookData) => {
    const id = await addBookToFirestore(newBook);
    return { id, ...newBook };
  },
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load books";
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to add book";
      });
  },
});

export default booksSlice.reducer;
