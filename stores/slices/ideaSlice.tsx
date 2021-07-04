import { createSlice } from "@reduxjs/toolkit";
const ideaSlice = createSlice({
    name: 'comment',
    initialState: {
        ideaId: null,
        comments: null,
        selectedCommentId: null,
        subComments: null,
        currentIdea: null
    },
    reducers: {
        setIdeaId(state, action){
            state.ideaId = action.payload;
        },
        setComments(state, action){
            state.comments = action.payload;
        },
        setCommentReplies(state, action){
            state.subComments = action.payload;
        },
        setCurrentIdea(state, action){
            state.currentIdea = action.payload;
        },
    }
})

export const  { setIdeaId, setComments, setCommentReplies, setCurrentIdea } = ideaSlice.actions;
export default ideaSlice.reducer;