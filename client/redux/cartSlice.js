import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
    },
    reducers: {
        viewCart: (state) => {
            state.hidden = !state.hidden;
        },
        addToCart: (state, action) => {
            const cartItemInCart = state.cart.find((item) => item.id === action.payload.id);
            if (cartItemInCart) {
                cartItemInCart.quantity++;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        incrementQuantity: (state, action) => {
            const cartItem = state.cart.find((item) => item.id === action.payload);
            cartItem.quantity++;
        },
        decrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload);
            if (cartItem.quantity === 1) {
                cartItem.quantity = 1
            } else {
                cartItem.quantity--;
            }
        },
        removeItem: (state, action) => {
            const removeCartItem = state.cart.filter((item) => item.id !== action.payload);
            state.cart = removeCartItem;
        },
    },
});

export const cartReducer = cartSlice.reducer;
export const {
    viewCart,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeItem,
} = cartSlice.actions;