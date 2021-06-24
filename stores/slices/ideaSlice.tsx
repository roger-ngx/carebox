import { createSlice } from "@reduxjs/toolkit";
const ideaSlice = createSlice({
    name: 'comment',
    initialState: {
        ideaId: null,
        comments: null,
    },
    reducers: {
        setIdeaId(state, action){
            state.ideaId = action.payload;
        },
        setComments(state, action){
            state.comments = action.payload;
        },
    }
})

export const  { setIdeaId, setComments } = ideaSlice.actions;
export default ideaSlice.reducer;