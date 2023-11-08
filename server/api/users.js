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

//either we need to use this or the cart.js file
usersRouter.put("/me/cart/:id", async (req, res, next) => {
    try {
        const cart = await prisma.cart.update({
            where: { id: user.id },
            data:{
                user: req.user.id,
                cartItems: {
                    create: [
                      { quantity: 5, productId: 1 },
                      { quantity: 4, productId: 2 },
                      { quantity: 3, productId: 3 }
                    ]
                  },
                  include: {cartItems: true}
            }
        });
        res.send(cart);
    } catch (error) {
        next(error);
    }
} )

module.exports = usersRouter;