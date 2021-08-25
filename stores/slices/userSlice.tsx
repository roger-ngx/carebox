import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        userProfileData: null,
        ideas: null,
        userNotifications: null,
        userRegisteredComments: null,
        publicNotifications: null
    },
    reducers: {
        setUser(state, action){
            state.currentUser = action.payload;
        },
        setUserProfileData(state, action){
            state.userProfileData = action.payload;
        },
        setUserNotifications(state, action){
            state.userNotifications = action.payload;
        },
        setIdeas(state, action){
            state.ideas = action.payload;
        },
        addIdea(state, action){
            state.ideas = [action.payload, ...state.ideas]
        },
        setUserRegisteredComments(state, action){
            state.userRegisteredComments = action.payload;
        },
        setPublicNotifications(state, action){
            state.publicNotifications = action.payload;
        },
    }
})

export const  { setUser, setUserProfileData, setIdeas, addIdea, setUserNotifications, setUserRegisteredComments, setPublicNotifications } = userSlice.actions;
export default userSlice.reducer;