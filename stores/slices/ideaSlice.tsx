import { createSlice } from "@reduxjs/toolkit";
const ideaSlice = createSlice({
    name: 'comment',
    initialState: {
        ideaId: null,
        comments: null,
        selectedCommentId: null,
        subComments: {},
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
            const { commentId, data } = action.payload;
            state.subComments[`${commentId}`] = data;
        },
        setCurrentIdea(state, action){
            state.currentIdea = action.payload;
        },
    }
})

export const  { setIdeaId, setComments, setCommentReplies, setCurrentIdea } = ideaSlice.actions;
export default ideaSlice.reducer;