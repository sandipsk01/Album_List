import { albumReducer } from "./reducer/albumReducer";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
    reducer:{
        albumReducer
    }
})

