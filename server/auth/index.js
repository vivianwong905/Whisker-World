const authRouter = require("express").Router();
const prisma = require("../db/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const SALT_ROUNDS = 5;

// Register a new user account
authRouter.post("/register", async (req, res, next) => {
    try {
        const { username, password, name, admin, cart } = req.body;
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

            const user = await prisma.user.create({
                data: {
                    username: username,
                    password: hashedPassword,
                    name: name,
                    admin: admin,
                    cart: {
                        create: {
                            cart: cart,
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
            // Find the user by username or code
            const user = await prisma.user.findUnique({
                where: { username: username },
            });
            if (!user) {
                next({
                    name: 'IncorrectCredentialsError',
                    message: 'Username or password is incorrect'
                });
            } else {
                const hashedPassword = user.password;
                //compare plain text password and hasedpassword
                const validPassword = await bcrypt.compare(
                    password,
                    hashedPassword
                );

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
    } catch (error) {
        next(error);
    }
});

// Get the currently logged in user
authRouter.get("/me", async (req, res, next) => {
    if (!req.user) {
        return res.send({});
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
        });

        res.send(user);
    } catch (error) {
        next(error);
    }
});

// Admin get all users
authRouter.get('/', async (req, res, next) => {
    try {
        const admin = await prisma.user.findUnique({
            where: { id: req.user.id}
        })
        if(admin === req.user.admin){
            const users = await prisma.user.findMany();
            
            users.forEach(user => delete user.password);
    
            res.send(users);
        } else{
            res.status(401);
            next({
              name: "MissingAdminError",
              message: "You must be an admin to preform this action"
            });
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});


module.exports = authRouter;
