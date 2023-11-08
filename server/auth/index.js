const authRouter = require("express").Router();
const prisma = require("../db/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const SALT_ROUNDS = 5;

// Register a new user account
authRouter.post("/register", async (req, res, next) => {
    try {
        // Encrypt the password before saving it to the database
        const password = await bcrypt.hash(req.body.password, SALT_ROUNDS);

        const user = await prisma.user.create({
            data: { username: req.body.username, password },
        });

        // Create a token with the user id
        const token = jwt.sign({ id: user.id }, process.env.JWT);

        res.status(201).send({ token });
    } catch (error) {
        next(error);
    }
});

// Login to an existing user account

authRouter.post("/login", async (req, res, next) => {
    try {
        // Find the user by username or code
        const user = await prisma.user.findUnique({
            where: { username: req.body.username },
        });

        const validPassword = await bcrypt.compare(
            req.body.password,
            user?.password ?? ""
        );

        // Only check the password if login was not via OAuth
        if (!user || (!req.body.code && !validPassword)) {
            return res.status(401).send("Invalid login credentials.");
        }

        // Create a token with the user id
        const token = jwt.sign({ id: user.id }, process.env.JWT);

        res.send({ token });
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


module.exports = authRouter;
