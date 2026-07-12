import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../lib/booksApi";

export interface CartItem {
  book: Book;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Book>) => {
      const existing = state.items.find((i) => i.book.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ book: action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.book.id !== action.payload);
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.book.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.book.id === action.payload);
      if (!item) return;
      item.quantity -= 1;
      if (item.quantity <= 0) {
        state.items = state.items.filter((i) => i.book.id !== action.payload);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
