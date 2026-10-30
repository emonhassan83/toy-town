/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProduct: {},
};

const cartProductSlice = createSlice({
  name: "cartProductSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product_id } = action.payload;
      // Add state the cart products with the new product
      state.cartProduct = { product_id };
    },
    removeFromCart: (state, action) => {
      const product_id = action.payload;
      delete state.cartProduct.product_id;
    },
  },
});

export const { addToCart, removeFromCart } = cartProductSlice.actions;

export default cartProductSlice.reducer;
