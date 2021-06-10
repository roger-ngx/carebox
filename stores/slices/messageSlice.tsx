import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        message: 'Hello World'
    },
    reducers: {
        setMessage(state, action: PayloadAction<string>){
            state.message = action.payload;
        }
    }
})

export const { setMessage } = messageSlice.actions;
export default messageSlice.reducer;