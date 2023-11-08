const cartRouter = require("express").Router();
const prisma = require("../db/client");

// Deny access if user is not logged in
cartRouter.use((req, res, next) => {
    if (!req.user) {
        return res.status(401).send("You must be logged in to do that.");
    }
    next();
});

// Update a cart (user)
cartRouter.put("/:id", async (req, res, next) => {
    try {
        const cart = await prisma.cart.update({
            where: { id: +req.params.id },
            data: req.body,
        });


        res.send(cart);
    } catch (error) {
        next(error);
    }
});

module.exports = cartRouter;