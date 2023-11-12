import { configureStore } from '@reduxjs/toolkit';

import api from './api'
import tokenReducer from './tokenSlice'

const store = configureStore({
    reducer: {
        [api.reducerPath] : api.reducer,
        token: tokenReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(api.middleware)
    }
})

export default store;