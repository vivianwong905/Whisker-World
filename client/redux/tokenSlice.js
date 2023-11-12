import { createSlice } from '@reduxjs/toolkit';

import api from './api';

const tokenSlice = createSlice({
    name: "token",
    initialState: null,
    reducers: {
        setToken: (_state, {payload}) => payload.token
    },

    extraReducers: (builder) => {
        builder.addMatcher(
            api.endpoints.register.matchFulfilled,
            (state, {payload}) => payload.token
        );

        builder.addMatcher(
            api.endpoints.login.matchFulfilled,
            (state, {payload}) => payload.token
        )
    }
});

export default tokenSlice.reducer;

export const {setToken} = tokenSlice.actions;

