import { createSlice } from "@reduxjs/toolkit";

const stylesSlice = createSlice({
    name: 'styles',
    initialState: {
        interface: {
            notelist : {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                gap: '10px',
            },
            noteitem: {
                width: '200px',
                padding: '15px',
                border: '2px solid rgb(103, 102, 102)',
                borderRadius: '10px',
                display: 'inline-block',
            }
        }
    },
    reducers: {
        changeStyles: (state, action) => {
            state.interface = action.payload
        },
    },
})

export const { changeStyles } = stylesSlice.actions
export default stylesSlice.reducer