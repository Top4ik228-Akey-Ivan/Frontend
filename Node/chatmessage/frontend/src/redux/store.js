import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { chatsReducer } from "./slices/chats";

const store = configureStore({
    reducer: {
        auth: authReducer,
        chats: chatsReducer,
    }
})

export default store