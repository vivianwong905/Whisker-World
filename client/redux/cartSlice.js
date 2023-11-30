import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const cartItemInCart = state.items.find((item) => item.id === action.payload.id);
            if (cartItemInCart) {
                cartItemInCart.quantity++;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        incrementQuantity: (state, action) => {
            const cartItem = state.items.find((item) => item.id === action.payload);
            cartItem.quantity++;
        },
        decrementQuantity: (state, action) => {
            const cartItem = state.items.find((item) => item.id === action.payload);
            if (cartItem.quantity === 1) {
                cartItem.quantity = 1
            } else {
                cartItem.quantity--;
            }
        },
        removeItem: (state, action) => {
            const removeCartItem = state.items.filter((item) => item.id !== action.payload);
            state.items = removeCartItem;
        },
        clearCart: (state) => {
           return [];
        }
    },
});

export const cartReducer = cartSlice.reducer;
export const {
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    clearCart
} = cartSlice.actions;