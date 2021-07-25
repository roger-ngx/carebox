import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from './slices/tokenSlice';
import userReducer from './slices/userSlice';
import devToolsEnhancer from "remote-redux-devtools";
import ideaSlice from "./slices/ideaSlice";
import bulletinSlice from "./slices/bulletinSlice";

export const store = configureStore({
    reducer: {
        auth: tokenReducer,
        user: userReducer,
        idea: ideaSlice,
        bulletinBoard: bulletinSlice
    },
    devTools: true,
    enhancers: [devToolsEnhancer({ realtime: true, hostname: 'localhost', port: 19000})]
})