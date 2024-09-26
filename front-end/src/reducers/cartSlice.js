import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

const initialState = {
  items: loadFromLocalStorage(), // Load initial state from local storage
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity });
      }
      localStorage.setItem('cart', JSON.stringify(state.items)); // Save to local storage
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items)); // Update local storage
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cart'); // Clear local storage
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
