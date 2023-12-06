import { createSlice } from '@reduxjs/toolkit';

import api from './api';

const authSlice = createSlice({
    name: "auth",
    initialState: {token: localStorage.getItem("token"), 
    user: JSON.parse(localStorage.getItem("user"))},
    reducers: {
        logout: successfulLogout
    },

    extraReducers: (builder) => {
        builder.addMatcher(
            api.endpoints.register.matchFulfilled,
            successfulAuth
        );

        builder.addMatcher(
            api.endpoints.login.matchFulfilled,
            successfulAuth
        )
    }
});
//local storage
function successfulAuth(state, {payload}) {
    localStorage.setItem("token", payload.token)
    localStorage.setItem("user", JSON.stringify(payload.user))
    localStorage.removeItem("cart")
    return ({token: payload.token, user:payload.user})
}

function successfulLogout(_state) {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("cart")
    return ({token: null, user: null})
}
export default authSlice.reducer;

export const {logout} = authSlice.actions;

