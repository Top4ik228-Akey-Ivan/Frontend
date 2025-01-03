import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'

export const fetchChats = createAsyncThunk('chats/fetchChacts', async(userId) => {
    const { data } = await axios.get(`/chats/${userId}`)
    return data
})

const initialState = {
    data: [],
    status: 'loading'
}

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChats.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchChats.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
            })
            .addCase(fetchChats.rejected, (state) => {
                state.status = 'error';
                state.data = null;
            })

    }
})

export const chatsReducer = chatsSlice.reducer