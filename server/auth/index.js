const authRouter = require("express").Router();
const prisma = require("../db/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { requireAdmin, requireUser } = require("./middleware");


const SALT_ROUNDS = 5;

// Register a new user account
authRouter.post("/register", async (req, res, next) => {
    try {
        const { username, password, name, cartItems } = req.body;
        if (!username || !password) {
            next({
                name: "MissingCredentialsError",
                message: "Please supply both a username and password"
            });
            return;
        }
        // Encrypt the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const _user = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        if (_user) {
            res.status(403)
            next({
                name: 'UserExistsError',
                message: 'A user by that username already exists'
            });
        } else {
            // todo: come back later, what to do with an existing cart (tier3) then you log in
            // attached logged out cart to new registered user

            // TODO: create cart with cart items optionally if they where a guest and had the cart 
const query = {
    data: {
        cartItems: {
            create: cartItems.map((item) => ({
                quantity: item.quantity,
                product: {
                    connect: {
                        id: Number(item.id)
                    }
                }
            }))
        },
    },
    include:{
        cartItems: {
            include:{
                product: true
            }
        }
    },

}
console.log(query)
            //line const cart is creating an empty cart with the const user on connected: cart.id
            const cart = await prisma.cart.create(query);
            const user = await prisma.user.create({
                data: {
                    username: username,
                    password: hashedPassword,
                    name: name,
                    cart: {
                        connect: {
                            id: cart.id,
                        }
                    }
                },
            });
            if (!user) {
                res.status(500)
                next({
                    name: 'UserCreationError',
                    message: 'There was a problem registering. Please try again.',
                });
                return;
            } else {
                delete user.password;

                // Create a token with the user id
                const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET, {
                    expiresIn: '1w'
                });

                res.status(201).send({
                    user,
                    message: "thank you for signing up",
                    token
                });
            }
        }
    } catch (error) {
        next(error);
    }
});

// Login to an existing user account
authRouter.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(500)
            next({
                name: "MissingCredentialsError",
                message: "Please supply both a username and password"
            });
        } else {
            const user = await prisma.user.findUnique({
                where: { username: username },
            });
            if (!user) {
                next({
                    name: 'UserDoesNotExist',
                    message: 'No User by that Username exists'
                });
            } else {
                const hashedPassword = user.password;
                //compare plain text password and hashedpassword
                const validPassword = await bcrypt.compare(
                    password,
                    hashedPassword
                );
                if (!validPassword) {
                    next({
                        name: 'IncorrectCredentialsError',
                        message: 'Username or password is incorrect'
                    });
                    return;
                } else {
                    // Create a token with the user id
                    const token = jwt.sign({
                        id: user.id,
                        username
                    }, process.env.JWT_SECRET, {
                        expiresIn: '1w'
                    });

                    //delete user password before sending to the frontend
                    delete user.password

                    res.status(201).send({
                        user,
                        message: "you're logged in!",
                        token
                    });

                }

            }
        }
    } catch (error) {
        next(error);
    }
});

// Get the currently logged in user
authRouter.get("/me", requireUser, async (req, res, next) => {
    if (!req.user) {
        return res.send({});
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
        });
        //delete user password before sending to the frontend
        delete user.password

        res.send(user);
    } catch (error) {
        next(error);
    }
});

// Admin get all users
authRouter.get('/', [requireUser, requireAdmin], async (req, res, next) => {
    try {

        const users = await prisma.user.findMany();

        users.forEach(user => delete user.password);

        res.send(users);


    } catch ({ name, message }) {
        next({ name, message });
    }
});

authRouter.get('*', (req, res) => {
    res.status(404).send({
        error: '404 - Not Found',
        message: 'No route found for the requested URL',
    });
});

module.exports = authRouter;
