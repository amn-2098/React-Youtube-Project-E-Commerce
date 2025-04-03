// // import { createSlice } from '@reduxjs/toolkit';

// // const initialState = {
// //     products: [],
// //     totalQuantity: 0,
// //     totalPrice: 0
// // }

// // const cartSlice = createSlice({
// //     name: 'cart',
// //     initialState,
// //     reducers: {
// //         addToCart(state, action) {
// //             const newItem = action.payload;
// //             const itemIndex = state.products.findIndex((item) => item.id === newItem.id);

// //             if (itemIndex !== -1) {
// //                 state.products[itemIndex].quantity++;
// //                 state.products[itemIndex].totalPrice += newItem.price;
// //             } else {
// //                 state.products.push({
// //                     id: newItem.id,
// //                     name: newItem.name,
// //                     price: newItem.price,
// //                     quantity: 1,
// //                     totalPrice: newItem.price,
// //                     image: newItem.image
// //                 });
// //             }

// //             state.totalPrice += newItem.price;
// //             state.totalQuantity++;
// //         },
// //         removeFromCart(state, action) { 
// //             const id = action.payload;
// //             const findItem = state.products.find((item) => item.id === id);
// //             if(findItem) {
// //                 state.totalPrice -= findItem.totalPrice;
// //                 state.totalQuantity -= findItem.quantity;
// //                 state.products = state.products.filter((item) => item.id !== id);
// //             }
// //         },
// //         increaseQuantity(state, action) {
// //             const id = action.payload;
// //             const findItem = state.products.find((item) => item.id === id);
// //             if (findItem) {
// //                 findItem.quantity++;
// //                 findItem.totalPrice = parseFloat((findItem.totalPrice + findItem.price).toFixed(2));
// //                 state.totalQuantity++;
// //                 state.totalPrice = parseFloat((state.totalPrice + findItem.price).toFixed(2));
// //             }
// //         },
// //         decreaseQuantity(state, action) {
// //             const id = action.payload;
// //             const findItem = state.products.find((item) => item.id === id);
// //             if (findItem && findItem.quantity > 1) {
// //                 findItem.quantity--;
// //                 findItem.totalPrice = parseFloat((findItem.totalPrice - findItem.price).toFixed(2));
// //                 state.totalQuantity--;
// //                 state.totalPrice = parseFloat((state.totalPrice - findItem.price).toFixed(2));
// //             }
// //         }
        
// //     },
// // })

// // export const { addToCart, removeFromCart,increaseQuantity,decreaseQuantity } = cartSlice.actions;
// // export default cartSlice.reducer;






// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Async action to add item to cart
// export const addToCart = createAsyncThunk("cart/addToCart", async (cartData, { rejectWithValue }) => {
//     try {
//         const formData = new FormData();
        
//         // Append form data fields
//         formData.append("id", cartData.id);
//         formData.append("name", cartData.name);
//         formData.append("price", cartData.price);
//         formData.append("quantity", cartData.quantity);
//         formData.append("categories", JSON.stringify(cartData.categories));
//         if (cartData.image) {
//             formData.append("image", cartData.image);  // Ensure image is included as file
//         }

//         const response = await axios.post("http://localhost:3000/api/cart/add", formData, {
//             headers: {
//                 "Content-Type": "multipart/form-data",  // For file uploads
//             },
//             timeout: 10000  // Timeout after 10 seconds
//         });
        

//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error.response.data);
//     }
// });

// const cartSlice = createSlice({
//     name: "cart",
//     initialState: {
//         products: [],
//         totalQuantity: 0,
//         totalPrice: 0,
//         status: "idle",
//         error: null
//     },
//     reducers: {
//         removeFromCart: (state, action) => {
//             state.products = state.products.filter(item => item.id !== action.payload);
//         },
//         increaseQuantity: (state, action) => {
//             const item = state.products.find(item => item.id === action.payload);
//             if (item) item.quantity += 1;
//         },
//         decreaseQuantity: (state, action) => {
//             const item = state.products.find(item => item.id === action.payload);
//             if (item && item.quantity > 1) item.quantity -= 1;
//         },
//     },
    
//     extraReducers: (builder) => {
//         builder
//             .addCase(addToCart.pending, (state) => {
//                 state.status = "loading";
//             })
//             // .addCase(addToCart.fulfilled, (state, action) => {
//             //     state.products.push({
//             //         id: action.payload.id,
//             //         name: action.payload.name,
//             //         price: action.payload.price,
//             //         quantity: action.payload.quantity || 1,
//             //         totalPrice: action.payload.price,
//             //         image: action.payload.image // Ensure image is added to state
//             //     });

//             //     console.log("🛒 Item added to the database:", action.payload); // ✅ Log added items
                
//             // })
//             .addCase(addToCart.fulfilled, (state, action) => {
//     console.log("🛒 Added Product from API:", action.payload); // Debug API response

//     if (!action.payload.cart || !action.payload.cart.products) {
//         console.error("❌ Error: Invalid cart response", action.payload);
//         return;
//     }

//     // Extract product data
//     const addedProduct = action.payload.cart.products[0];  
//     state.products.push({
//         ...addedProduct,
//         image: `http://localhost:3000${addedProduct.image}`  // Fix image path
//     });

//     state.totalQuantity = action.payload.cart.totalQuantity;  
//     state.totalPrice = action.payload.cart.totalPrice;
// })

//             .addCase(addToCart.rejected, (state, action) => {
//                 state.status = "failed";
//                 state.error = action.payload;
//             });
//     }
// });

// export const { removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
// export default cartSlice.reducer;




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
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, setCartData } = cartSlice.actions;
export default cartSlice.reducer;
