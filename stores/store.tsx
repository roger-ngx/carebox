import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from './slices/tokenSlice';
import devToolsEnhancer from "remote-redux-devtools";

export const store = configureStore({
    reducer: {
        auth: tokenReducer
    },
    devTools: true,
    enhancers: [devToolsEnhancer({ realtime: true, port: 8000, hostname: 'localhost' })]
})