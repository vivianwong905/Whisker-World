import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
    reducerPath: "api",

    baseQuery: fetchBaseQuery({
        //base url for API calls ... need to change this when deployed
        baseUrl: "/",
        // set the Content-Type header to the application/json
        prepareHeaders: (headers, { getState }) => {
            const token = getState().token
            headers.set("Content-Type", "application/json")
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),

    // define the API endpoints we are trying to access
    endpoints: (builder) => ({
        //cat product-
        //get all the cat products
        getCatProducts: builder.query({
            query: () => "/api/products/",
        }),
        //get single cat product query
        getSingleCatProduct: builder.query({
            query: (productId) => "/api/products/" + productId,
        }),

        //TODO: create new cat product mutation

        createCatProduct: builder.mutation({}),

        //TODO: update new cat product mutation

        updateCatProduct: builder.mutation({}),

        //TODO: delete cat product mutation

        deleteCatProduct: builder.mutation({}),

        //cart querys and mutations:
        //TODO: get users items in cart api/users/me/cart query

        getUsersCart: builder.query({}),

        //TODO: create items in users cart api/users/me/cart mutation

        createCartItemsInCart: builder.mutation({}),

        // TODO: update users cart api/users/me/cart/:id mutation

        updateUsersCart: builder.mutation({}),

        // TODO: delete items in users cart api/users/me/cart/:id mutation

        deleteCartItemsInCart: builder.mutation({}),

        //auth folder:
        //TODO: the /auth/register mutation

            register: builder.mutation({
            query: (user) => ({
                url: '/auth/register',
                method: "POST",
                body: user 
            }),
    
        }),

        //TODO: the /auth/login mutation 
        
            login: builder.mutation({
            query: (user) => ({
                url: '/auth/login',
                method: "POST",
                body: user
            }),
      
        }), 

        //TODO: curently logged in user query /auth/me

        currentUser: builder.query({}),

        //TODO: get all users admin query /auth/
        getAllUsers: builder.query({}),
    })
})


export default api;

export const {
  useGetCatProductsQuery,
  useGetSingleCatProductQuery,
  useRegisterMutation,
  useLoginMutation,
} = api;
