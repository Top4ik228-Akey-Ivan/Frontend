import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
    name: 'notes',
    initialState: [
        {
            id: 1,
            title: 'Note 1',
            text: 'Text 1Text 1Text 1Text 1Text 1Text 1Text 1Text 1Text 1Text 1Text 1Text 1',
        },
        {
            id: 2,
            title: 'Note 2',
            text: 'Text 2Text 2Text 2Text 2Text 2Text 2Text 2Text 2Text 2Text 2Text 2Text 2',
        },
        {
            id: 3,
            title: 'Note 3',
            text: 'Text 1Text 1Text 1Text 1Text 1Text 1Text 1Text 1Text 1Text 1Text 1Text 1',
        },
        {
            id: 4,
            title: 'Note 4',
            text: 'Text 2Text 2Text 2Text 2Text 2Text 2Text 2Text 2Text 2Text 2Text 2Text 2',
        },
        {
            id: 5,
            title: 'Note 5',
            text: 'Text 1Text 1Text 1Text 1Text 1Text 1Text 1Text 1Text 1Text 1Text 1Text 1',
        },
        {
            id: 6,
            title: 'Note 6',
            text: 'Text 2Text 2Text 2Text 2Text 2Text 2Text 2Text 2Text 2Text 2Text 2Text 2',
        },
    ],
    reducers: {
        addNote: (state, action) => {
            state.push(action.payload)
        },
        removeNote: (state, action) => {
            state.filter(note => note.id !== action.payload)
        },
        updateNote: (state, action) => {
            const index = state.findIndex(note => note.id === action.payload.id)
            if (index !== -1) state[index] = action.payload
        },
    },
})

export const {addNote, removeNote, updateNote} = noteSlice.actions
export default noteSlice.reducer