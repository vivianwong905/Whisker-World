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
        //get all the cat products api/products/
        getCatProducts: builder.query({
            query: () => "/api/products/",
        }),
        //get single cat product query api/products/:id
        getSingleCatProduct: builder.query({
            query: (productId) => "/api/products/" + productId,
        }),

        // create new cat product mutation api/products/
        createCatProduct: builder.mutation({
            query: (productData) => ({
                url: "api/products/",
                method: "POST",
                body: productData
            })
        }),

        //TODO: update new cat product mutation api/products/:id

        updateCatProduct: builder.mutation({}),

        //TODO: delete cat product mutation api/products/:id

        deleteCatProduct: builder.mutation({}),

        //cart querys and mutations:
        //TODO: get users items in cart api/users/me/cart query

        getUsersCart: builder.query({}),

        //TODO: create items in users cart api/users/me/cart/items mutation

        createCartItemsInCart: builder.mutation({}),

        // TODO: update users cart api/users/me/cart/items/:id mutation

        updateUsersCart: builder.mutation({}),

        // TODO: delete items in users cart api/users/me/cart/items/:id mutation

        deleteCartItemsInCart: builder.mutation({}),

        //auth folder:
        // /auth/register mutation

        register: builder.mutation({
            query: (user) => ({
                url: '/auth/register',
                method: "POST",
                body: user
            }),

        }),

        // /auth/login mutation 

        login: builder.mutation({
            query: (user) => ({
                url: '/auth/login',
                method: "POST",
                body: user
            }),

        }),

        //curently logged in user query /auth/me

        currentUser: builder.query({
            query: () => "/auth/me",
        }),

        // get all users admin query /auth/
        
        getAllUsers: builder.query({
            query: () => "/auth/",
        }),
    })
})


export default api;

export const { //ADD Querys or Mutaions in order from above
    useGetCatProductsQuery,
    useGetSingleCatProductQuery,
    useCreateCatProductMutation,
    //querys or mutations add here
    useRegisterMutation,
    useLoginMutation,
    useCurrentUserQuery,
    useGetAllUsersQuery
} = api;
