const request = require("supertest");

const app = require('../app');

const prismaMock = require('../../mocks/prismaMock');

const bcrypt = require('bcrypt');
jest.mock('bcrypt');

const jwt = require('jsonwebtoken');
jest.mock('jsonwebtoken');

describe('/auth', () => {
    beforeEach(() => {
        jwt.sign.mockReset();
        bcrypt.hash.mockReset();
        bcrypt.compare.mockReset();
    });
    describe('GET /auth', () => {
        it('returns list of all users', async () => { //needs to be an admin 
            const users = [
                { id: 1, username: 'catscatscats', name: 'Cat Doe', password: 'password', admin: true  },
                { id: 2, username: 'dogsdogsdogs', name: 'Spike Doe', password: 'password' }
            ];

            const token = "123ghejghurea";
            jwt.verify.mockReturnValue(users[0]);
            prismaMock.user.findUnique.mockResolvedValue(users[0]);

            prismaMock.user.findMany.mockResolvedValue(users);

            const response = await request(app).get('/auth').set('Authorization', 'Bearer '+ token);
            console.log(response.body)
            expect(response.body).toEqual(users);
            expect(response.body[0]).toEqual(users[0]);
            expect(response.body[1]).toEqual(users[1]);
        });
    });

    describe('GET /auth/me', () => { // needs to be logged in
        it('returns the currently logged in user', async () => {
            const loggedInUser = {
                id: 2,
                username: "candyPumpkin",
                password: "password"
            }
            
            const token = "123ghejghurea";
            jwt.verify.mockReturnValue(loggedInUser);
            prismaMock.user.findUnique.mockResolvedValue(loggedInUser);
            
            const response = await request(app).get('/auth/me').send(loggedInUser).set('Authorization', 'Bearer '+ token);

            expect(response.body).toEqual(loggedInUser);
        })
    });

    describe('POST /auth/register', () => {
        it('creates a new user and a token', async () => {
            const newUser = {
                username: "SpiceGirls",
                name: "Buffy",
                password: "password",
            }
            
            const createdUser = {
                id: "2",
                ...newUser,
                cart:{
                    connect:{
                        id: 2
                    }
                }
            }
            const cart= {
                id: 2,
                user: createdUser
            }
            const token = "123ghejghurea";
            const hashedPassword = "somehashedpassword";

            bcrypt.hash.mockResolvedValue(hashedPassword)
            prismaMock.cart.create.mockResolvedValue(cart)
            prismaMock.user.findUnique.mockResolvedValue(null)

            prismaMock.user.create.mockResolvedValue(createdUser);
            jwt.sign.mockReturnValue(token)

            const response = await request(app).post('/auth/register').send(newUser);
            console.log(response.body)

            expect(response.status).toBe(201)

            expect(response.body.user.username).toEqual(createdUser.username)
            expect(response.body.user.id).toEqual(createdUser.id)

            // token was sent in the response
            expect(response.body.token).toEqual(token);

            // NO password was sent in the reponse
            expect(response.body.user.password).toBeUndefined();

            expect(bcrypt.hash).toHaveBeenCalledTimes(1);

            expect(prismaMock.user.create).toHaveBeenCalledTimes(1);

        })
        it('does not create a user if user with that email already exists', async () => {
            const existingUser = {
                username: 'testemail@testing.com'
            }
            const newUser = {
                username: 'testemail@testing.com',
                password: "testpassword"
            }

            prismaMock.user.findUnique.mockResolvedValue(existingUser);

            const response = await request(app).post('/auth/register').send(newUser);

            expect(response.status).toBe(403);
            expect(response.body.name).toBe('UserExistsError');

            expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
            expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
                where: { username: newUser.username }
            })

            // ensure none of the other register code has run
            expect(prismaMock.user.create).toHaveBeenCalledTimes(0);
            expect(jwt.sign).toHaveBeenCalledTimes(0);
        });

        it('does not create a user if the email is missing', async () => {
            const newUser = {
                password: 'testpassword'
            }

            const response = await request(app).post('/auth/register').send(newUser);
            console.log(response.body)
            expect(response.status).toEqual(500);
            expect(response.body.name).toEqual('UserCreationError');

            expect(prismaMock.user.create).toHaveBeenCalledTimes(0);
            expect(bcrypt.hash).toHaveBeenCalledTimes(0);
            expect(jwt.sign).toHaveBeenCalledTimes(0);
        });

        it('does not create a user if the password is missing', async () => {
            const newUser = {
                username: "testemail@test.com"
            }

            const response = await request(app).post('/auth/register').send(newUser);
            console.log(response.body)
            expect(response.status).toEqual(500);
            expect(response.body.name).toEqual('UserCreationError');

            expect(prismaMock.user.create).toHaveBeenCalledTimes(0);
            expect(bcrypt.hash).toHaveBeenCalledTimes(0);
            expect(jwt.sign).toHaveBeenCalledTimes(0);
        });
    });

    describe('POST /auth/login', () => {

        it('successfully logs in a token and returns a token for valid email and password', async () => {
            const loggedInUser = {
                username: "candyPumpkin",
                password: "password"
            }
            // mock prisma.user.findUnique returns a user
            prismaMock.user.findUnique.mockResolvedValue(loggedInUser);
            const hashedPassword = "somehashedpassword";
            const token = "testtoken";
            // mock that bcrypt.compare succeeded
            bcrypt.compare.mockResolvedValue(loggedInUser.password, hashedPassword)
            // mock that jwt.sign returns the token
            jwt.sign.mockReturnValue(token)
            // test that the user and token are returned
            const response = await request(app).post('/auth/login').send(loggedInUser);

            expect(response.body.user.username).toEqual(loggedInUser.username)

            // token was sent in the response
            expect(response.body.token).toEqual(token);

            // NO password was sent in the reponse
            expect(response.body.password).toBeUndefined();

            expect(bcrypt.compare).toHaveBeenCalledTimes(1);

            expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);

        });

        it('does not log in user if the email is missing', async () => {
            const newUser = {
                password: "testpassword"
            }

            const response = await request(app).post('/auth/login').send(newUser);

            expect(response.status).toEqual(500);
            expect(response.body.name).toEqual("MissingCredentialsError");

            expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(0);

            expect(jwt.sign).toHaveBeenCalledTimes(0);
        });

        it('does not log in the user if the password is missing', async () => {
            const newUser = {
                email: "testemail@test.com"
            }

            const response = await request(app).post('/auth/login').send(newUser);

            expect(response.status).toEqual(500);
            expect(response.body.name).toEqual("MissingCredentialsError");

            expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(0);

            expect(jwt.sign).toHaveBeenCalledTimes(0);
        });

        it('does not log in a user with the wrong password', async () => {
            // mock bcrypt.compare
           
            const incorrectPassword = {
                username: "testemail@test.com",
                password: "incorrect"
            }
            // mock prisma.user.findUnique returns a user
            prismaMock.user.findUnique.mockResolvedValue(incorrectPassword);
        

            // mock that bcrypt.compare failed
            bcrypt.compare.mockResolvedValue(false)

            const response = await request(app).post('/auth/login').send(incorrectPassword);

            expect(response.body.name).toEqual('IncorrectCredentialsError');
        })
    });

    

});

