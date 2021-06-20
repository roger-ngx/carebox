import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from './slices/tokenSlice';
import userReducer from './slices/userSlice';
import devToolsEnhancer from "remote-redux-devtools";

export const store = configureStore({
    reducer: {
        auth: tokenReducer,
        user: userReducer
    },
    devTools: true,
    enhancers: [devToolsEnhancer({ realtime: true, hostname: 'localhost', port: 19000})]
})