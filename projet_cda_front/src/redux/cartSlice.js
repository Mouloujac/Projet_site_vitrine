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
    }
  }
});

export const { addToCart, removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;
