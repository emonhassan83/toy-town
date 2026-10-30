import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import cartProductSlice from "./features/products/productSlice";
import baseApi from "./api/baseApi";

const store = configureStore({
    reducer: {
        [baseApi.reducerPath] : baseApi.reducer,
        userSlice: userSlice,
        cartProductSlice: cartProductSlice,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export default store;