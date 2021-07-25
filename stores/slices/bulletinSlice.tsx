import { createSlice } from "@reduxjs/toolkit";
const bulletinSlice = createSlice({
    name: 'comment',
    initialState: {
        items: null,
        currentItem: null,
        comments: null
    },
    reducers: {
        setBulletinBoards(state, action){
            state.items = action.payload;
        },
        setBulletinBoardComments(state, action){
            state.comments = action.payload;
        },
        setCurrentBulletinItem(state, action){
            state.currentItem = action.payload;
        },
    }
})

export const  { setBulletinBoards, setBulletinBoardComments, setCurrentBulletinItem } = bulletinSlice.actions;
export default bulletinSlice.reducer;