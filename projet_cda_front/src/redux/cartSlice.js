import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeItemFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    replaceCart: (state, action) => {
      state.items = action.payload;
    }
  }
});

export const { addToCart, removeItemFromCart, replaceCart } = cartSlice.actions;

export default cartSlice.reducer;
