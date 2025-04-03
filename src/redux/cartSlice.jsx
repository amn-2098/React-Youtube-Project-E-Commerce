
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const itemIndex = state.products.findIndex((item) => item.id === newItem.id);

      if (itemIndex !== -1) {
        state.products[itemIndex].quantity++;
        state.products[itemIndex].totalPrice += newItem.price;
      } else {
        state.products.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          image: newItem.image,
        });
      }

      state.totalPrice += newItem.price;
      state.totalQuantity++;
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const findItem = state.products.find((item) => item.id === id);
      if (findItem) {
        state.totalPrice -= findItem.totalPrice;
        state.totalQuantity -= findItem.quantity;
        state.products = state.products.filter((item) => item.id !== id);
      }
    },
    increaseQuantity(state, action) {
      const id = action.payload;
      const findItem = state.products.find((item) => item.id === id);
      if (findItem) {
        findItem.quantity++;
        findItem.totalPrice = parseFloat((findItem.totalPrice + findItem.price).toFixed(2));
        state.totalQuantity++;
        state.totalPrice = parseFloat((state.totalPrice + findItem.price).toFixed(2));
      }
    },
    decreaseQuantity(state, action) {
      const id = action.payload;
      const findItem = state.products.find((item) => item.id === id);
      if (findItem && findItem.quantity > 1) {
        findItem.quantity--;
        findItem.totalPrice = parseFloat((findItem.totalPrice - findItem.price).toFixed(2));
        state.totalQuantity--;
        state.totalPrice = parseFloat((state.totalPrice - findItem.price).toFixed(2));
      }
    },
    setCartData: (state, action) => {
        // Ensure products is always an array
        state.products = Array.isArray(action.payload.products) ? action.payload.products : [];
  
        // Calculate totalQuantity and totalPrice correctly
        state.totalQuantity = state.products.reduce((acc, product) => acc + (product.quantity || 0), 0);
        state.totalPrice = state.products.reduce((acc, product) => acc + (product.totalPrice || 0), 0);
      },
      clearCart(state) { // Add this reducer
        state.products = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
      },

  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, setCartData,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
