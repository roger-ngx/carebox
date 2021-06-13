import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";

const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        isLoading: true,
        authToken: null
    },
    reducers: {
        setAuthToken(state, action: PayloadAction<string>){
            state.authToken = action.payload;
        },
        setLoadingToken(state, action){
            state.isLoading = action.payload;
        }
    }
})

export const { setAuthToken, setLoadingToken } = tokenSlice.actions;
export default tokenSlice.reducer;