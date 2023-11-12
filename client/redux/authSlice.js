import { createSlice } from '@reduxjs/toolkit';

import api from './api';

const authSlice = createSlice({
    name: "auth",
    initialState: {token: null, user: null},
    reducers: {
        logout: (_state) => ({token: null, user: null})
    },

    extraReducers: (builder) => {
        builder.addMatcher(
            api.endpoints.register.matchFulfilled,
            (state, {payload}) => ({token: payload.token, user:payload.user})
        );

        builder.addMatcher(
            api.endpoints.login.matchFulfilled,
            (state, {payload}) => ({token: payload.token, user:payload.user})
        )
    }
});

export default authSlice.reducer;

export const {logout} = authSlice.actions;

