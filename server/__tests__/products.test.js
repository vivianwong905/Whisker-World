const request = require("supertest");

const app = require('../app')

const prismaMock = require('../../mocks/prismaMock');

const jwt = require('jsonwebtoken');
jest.mock('jsonwebtoken');



describe('/api/posts', () => {
    beforeEach(() =>{
        jest.resetAllMocks();
    })

    describe('GET /api/products', () => {
        it('returns list of all products', async () => {
            const products = [
                { id: 1, name: "cats are cool", detail: "here are all the cool cats", price: 10, imageUrl: "www.image.com" },
                { id: 2, name: "dogs are cool", detail: "here are all the cool dogs", price: 12, imageUrl: "www.images.com" }
            ];

            prismaMock.product.findMany.mockResolvedValue(products);

            const response = await request(app).get('/api/products');
        
            expect(response.body[0]).toEqual(products[0]);
            expect(response.body[1]).toEqual(products[1]);
            expect(prismaMock.product.findMany).toHaveBeenCalledTimes(1);
        })

        // it('should handle an error', async () => {
        //     const mockErrorMessage = "error getting the products";

        //     prismaMock.posts.findMany.mockRejectedValue(new Error(mockErrorMessage));

        //     const response = await request(app).get('/api/products')
        //     console.log(response)
        //     expect(response.body).toEqual(mockErrorMessage);
        //     expect(prismaMock.products.findMany).toHaveBeenCalledTimes(1);

        // })
    });

    describe('GET /api/products/:id', () => {
        it('returns a single product', async () => {
            const productToFind =  { id: 2, name: "cats are cool", detail: "here are all the cool cats", price: 10, imageUrl: "www.image.com" };


            prismaMock.product.findUnique.mockResolvedValue(productToFind);
            
            const response = await request(app).get('/api/products/2');

            expect(response.body.id).toEqual(productToFind.id);
            expect(prismaMock.product.findUnique).toHaveBeenCalledTimes(1);
        })

        // it('should handle an error', async () => {
        //     const mockErrorMessage = `{"name":"Error","message":"Error occured during get single post"}`;

        //     prismaMock.products.findUnique.mockRejectedValue(new Error(mockErrorMessage));

        //     const response = await request(app).get('/api/products/1')

        //     expect(response._body.message).toEqual(mockErrorMessage);
        //     expect(prismaMock.products.findUnique).toHaveBeenCalledTimes(1);

        // })
    })

    describe('POST /api/products', () => {
        it('successfully creates a new product', async () => {
            const newProduct = { 
                id: 1, 
                name: "cats are cool", 
                detail: "here are all the cool cats", 
                price: 10, 
                imageUrl: "www.image.com"
            }

             //mock that you are logged in
            const userId = 2
            jwt.verify.mockReturnValue({ id: userId })
            prismaMock.users.findUnique.mockResolvedValue({ id: userId });

            prismaMock.product.create.mockResolvedValue(newProduct);

            const response = await request(app).post('/api/products').set('Authorization', 'Bearer testToken')
    
            expect(response.body.id).toEqual(newProduct.id);
            expect(response.body.title).toEqual(newProduct.title);
            expect(response.body.content).toEqual(newProduct.content);
            expect(response.body.tags).toEqual(newProduct.tags);

            expect(prismaMock.product.create).toHaveBeenCalledTimes(1);
        })

        // it('should handle an error', async () => {
        //     const mockErrorMessage = `{"name":"Error","message":"Error occured during creating post"}`;

        //      //mock that you are logged in
        //     const userId = 2
        //     jwt.verify.mockReturnValue({ id: userId })
        //     prismaMock.users.findUnique.mockResolvedValue({ id: userId });

        //     prismaMock.products.create.mockRejectedValue(new Error(mockErrorMessage));

        //     const response = await request(app).post('/api/products').set('Authorization', 'Bearer testToken')


        //     expect(response._body.message).toEqual(mockErrorMessage);
        //     expect(prismaMock.products.create).toHaveBeenCalledTimes(1);

        // })

        // it('should handle if user not logged in', async () => {
        //     const mockErrorMessage = "You must be logged in to preform this action"

        //     prismaMock.products.create.mockRejectedValue(new Error(mockErrorMessage));

        //     const response = await request(app).post('/api/products')

        //     expect(response.body.message).toEqual(mockErrorMessage);
        //     expect(prismaMock.products.create).toHaveBeenCalledTimes(0);
        // })
    })

    describe('PUT /api/products/:postId', () => {
        it('successfully updates a product', async () => {
            const user = {id: 2} 
            const productToUpdate = {
                id: 1, 
                name: "cats are cool", 
                detail: "here are all the cool cats", 
                price: 10, 
                imageUrl: "www.image.com"
            }

            const updatedProduct = {
                id: 1, 
                name: "cats are cool", 
                detail: "here are all the cool cats", 
                price: 12, 
                imageUrl: "www.image.com"
            }

            //mock that you are logged in
            jwt.verify.mockReturnValue({ id: user.id })
            prismaMock.user.findUnique.mockResolvedValue({ id: user.id});
    

            //mock the prisma calls for the put request
            prismaMock.product.findUnique.mockResolvedValue(productToUpdate)
            prismaMock.product.update.mockResolvedValue(updatedProduct);

            const response = await request(app)
                .put('/api/products/1')
                .set('Authorization', 'Bearer testToken')
                .send(updatedProduct);
            console.log(response.body)
            expect(response.body.id).toEqual(updatedProduct.id);
            expect(response.body.name).toEqual(updatedProduct.name);
            expect(response.body.detail).toEqual(updatedProduct.detail);
            expect(response.body.price).toEqual(updatedProduct.price);
            expect(response.body.imageUrl).toEqual(updatedProduct.imageUrl);

            expect(prismaMock.product.update).toHaveBeenCalledTimes(1);

        })

       

        // it('should handle user not be logged in', async () => {
        //     const mockErrorMessage = "You must be logged in to preform this action"

        //     prismaMock.products.update.mockRejectedValue(new Error(mockErrorMessage));

        //     const response = await request(app).put('/api/products/1')

        //     expect(response.body.message).toEqual(mockErrorMessage);
        //     expect(prismaMock.product.update).toHaveBeenCalledTimes(0);
        // })
    })

    describe('DELETE /api/products/:postId', () => {
        it('successfully deletes a product', async () => {
            const user ={id: 23} 
            const deletedProduct = {
                id: 1, 
                name: "cats are cool", 
                detail: "here are all the cool cats", 
                price: 10, 
                imageUrl: "www.image.com"
            }

             //mock that you are logged in
            jwt.verify.mockReturnValue({ id: user.id })
            prismaMock.user.findUnique.mockResolvedValue({ id: user.id });

            prismaMock.product.delete.mockResolvedValue(deletedProduct);

            const response = await request(app)
                .delete('/api/products/1')
                .set('Authorization', 'Bearer testToken')
            expect(response.body.id).toEqual(deletedProduct.id);
            expect(response.body.name).toEqual(deletedProduct.name);
            expect(response.body.detail).toEqual(deletedProduct.detail);
            expect(response.body.price).toEqual(deletedProduct.price);
            expect(response.body.imageUrl).toEqual(deletedProduct.imageUrl);
            

            expect(prismaMock.product.delete).toHaveBeenCalledTimes(1);

        })

        // it('should handle the user not be logged in', async () => {
        //     const mockErrorMessage = "You must be logged in to preform this action"

        //     prismaMock.product.delete.mockRejectedValue(new Error(mockErrorMessage));

        //     const response = await request(app).delete('/api/products/1')

        //     expect(response.body.message).toEqual(mockErrorMessage);
        //     expect(prismaMock.product.delete).toHaveBeenCalledTimes(0);
        // })
    })
})

