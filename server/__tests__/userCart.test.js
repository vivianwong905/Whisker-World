const request = require("supertest");

const app = require('../app')

const prismaMock = require('../../mocks/prismaMock');

const jwt = require('jsonwebtoken');
jest.mock('jsonwebtoken');



describe('/api/me/cart', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    })

    describe('GET /users/me/cart', () => {
        it('return a list of items in the cart of user', async () => {
            const loggedInUser = {
                id: 1,
                username: "kitty",
                password: "password"
            }

            const token = "12345HUYy";
            jwt.verify.mockReturnValue(loggedInUser);
            prismaMock.user.findUnique.mockResolvedValue(loggedInUser);


            const cart = { user: { id: 1, username: "kitty", cartId: 2 }, cartItems: { quantity: 2, productId: 108, cartId: 5 } }

            prismaMock.cart.findFirst.mockResolvedValue(cart);

            const response = await request(app)
                .get('/api/users/me/cart')
                .send(loggedInUser)
                .set('Authorization', 'Bearer ' + token);

            expect(response.body).toEqual(cart);
            expect(response.status).toBe(200);
            expect(prismaMock.cart.findFirst).toHaveBeenCalledTimes(1);
        })
        it('should handle errors', async () => {

            prismaMock.userCart.findFirst.mockRejectedValue(new Error('Some error'));


            const response = await request(app)
                .get('api/users/me/cart')
                .set('Authorization', 'Bearer Token');

            expect(response.status).toBe(500);
        });
    });

    // describe('POST /users/me/cart/items', () => {
    //     it('should add a product to my cart or update the quantity if that product is already there', async () => {
    //         const user = {
    //             id: 1,
    //             username: "kitty",
    //             password: "password",
    //             cartId: 2
    //         };

    //         const cart = {
    //             user: {
    //                 id: 1,
    //                 username: "kitty",
    //                 cartId: 2
    //             },
    //             cartItems: {
    //                 quantity: 2,
    //                 productId: 108,
    //                 cartId: 5
    //             }
    //         };
    //         const cartItemToAdd = {
    //             id: 418,
    //             quantity: 1,
    //             productId: 100,
    //             cartId: 2
    //         };

    //         jwt.verify.mockReturnValue(user);
    //         prismaMock.user.findUnique.mockResolvedValue(user);
    //         prismaMock.cart.findFirstOrThrow.mockResolvedValue(cart);

    //         prismaMock.cartItem.upsert.mockResolvedValue(cartItemToAdd);

    //         const response = await request(app)
    //             .post('/api/users/me/cart/items')
    //             .send(cartItemToAdd)
    //             .set('Authorization', 'Bearer fakeToken');

    //         console.log(response.body);
    //         expect(response.body.id).toEqual(cartItemToAdd.id);
    //          expect(response.body.quantity).toEqual(cartItemToAdd.quantity);
            // expect(response.body.productId).toEqual(cartItemToAdd.productId);
    //     });

    // });

    // describe('PATCH /users/me/cart/items/:id', () => {
    //     it('should update the cart items quantity', async () => {
    //         const user = {
    //             id: 1,
    //             cartId: 2
    //         }

    //         const cartItemToUpdate = {
    //             id: 1,
    //             quantity: 1,
    //             productId: 102,
    //             cartId: user.cartId
    //         }

    //         const updatedCartItem = {
    //             id: 1,
    //             quantity: 3,
    //             productId: 102,
    //             cartId: user.cartId
    //         }

    //         jwt.verify.mockReturnValue({id:user.id})
    //         prismaMock.user.findUnique.mockResolvedValue(user);
    //         prismaMock.cartItem.findUnique.mockResolvedValue(cartItemToUpdate);
    //         prismaMock.cartItem.update.mockResolvedValue(updatedCartItem);

    //         const response = await request(app)
    //             .patch('/api/users/me/cart/items/1')
    //             .set('Authorization', 'Bearer faketesttoken')
    //             .send(updatedCartItem);

    //         console.log(response.body)
    //         expect(response.body.id).toEqual(updatedCartItem.id)
    //         expect(response.body.quantity).toEqual(updatedCartItem.quantity);
    //         expect(response.body.productId).toEqual(updatedCartItem.productId);
    //     });

    // });

    describe('DELETE /users/me/cart/items/:id', () => {
        it('should remove the cart item from the cart', async () => {
            const user = {
                id: 1,
                cartId: 2
            }

            const cartItemToDelete = {
                id: 1,
                quantity: 3,
                productId: 102,
                cartId: user.cartId
            }

            jwt.verify.mockReturnValue({ id: user.id })
            prismaMock.user.findUnique.mockResolvedValue(user);
            prismaMock.cartItem.findUnique.mockResolvedValue(cartItemToDelete);
            prismaMock.cartItem.update.mockResolvedValue(cartItemToDelete);

            const response = await request(app)
                .delete('/api/users/me/cart/items/1')
                .set('Authorization', 'Bearer faketesttoken');

            console.log(response.body)
            expect(response.body.id).toEqual(cartItemToDelete.id);
            expect(response.body.quantity).toEqual(cartItemToDelete.quantity);
            expect(response.body.productId).toEqual(cartItemToDelete.productId);


        });

    });
})


