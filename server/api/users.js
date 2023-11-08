const usersRouter = require("express").Router();
const prisma = require("../db/client");

// Deny access if user is not logged in
usersRouter.use((req, res, next) => {
    if (!req.user) {
        return res.status(401).send("You must be logged in to do that.");
    }
    next();
});


// Get all users items in cart
usersRouter.get("/me/cart", async (req, res, next) => {
    try {
        const cart = await prisma.cart.findUnique({
            where: { id: user.id }
        });
        res.send(cart);
    } catch (error) {
        next(error);
    }
});

module.exports = usersRouter;