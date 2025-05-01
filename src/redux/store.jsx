import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './cartSlice'
import productSlice from './productSlice'
import userSlice from './userSlice'


const store= configureStore({
    reducer:{
        cart : cartSlice,
        product : productSlice,
        // product: productReducer,  /
        user: userSlice, // Add user slice here
       
    }
})

export default store;