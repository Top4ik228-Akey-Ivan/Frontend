// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice.ts';

const store = configureStore({
    reducer: {
        todos: todosReducer,
    },
});

// Определяем типы RootState и AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
