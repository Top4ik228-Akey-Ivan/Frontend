import { configureStore } from "@reduxjs/toolkit";
import noteReducer from './noteSlice'
import styleReducer from './stylesSlice'

const Store = configureStore({
    reducer: {
        notes: noteReducer,
        styles: styleReducer,
    },
})

export  default Store;