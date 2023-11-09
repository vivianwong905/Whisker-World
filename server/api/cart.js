const cartRouter = require("express").Router();
const prisma = require("../db/client");

// Deny access if user is not logged in
cartRouter.use((req, res, next) => {
    if (!req.user) {
        return res.status(401).send("You must be logged in to do that.");
    }
    next();
});

// Update a cart (user) either we need to use this or the users.js file
cartRouter.put("/:id", async (req, res, next) => {
    try {
        const cart = await prisma.cart.update({
            where: { id: req.user.cart.id },
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
});

//delete cart items route


module.exports = cartRouter;