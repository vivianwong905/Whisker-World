const usersRouter = require("express").Router();
const { requireUser } = require("../auth/middleware");
const prisma = require("../db/client");

// Deny access if user is not logged in
usersRouter.use((req, res, next) => {
    if (!req.user) {
        return res.status(401).send("You must be logged in to do that.");
    }
    next();
});


// Get all users items in cart
usersRouter.get("/me/cart", requireUser, async (req, res, next) => {
    try {
        const cart = await prisma.cart.findUnique({
            where: { id: req.user.id }, include:{cartItems:{include: {product: true}}}
        });
        res.send(cart);
    } catch (error) {
        next(error);
    }
});

// post - add an product to my cart
usersRouter.post("/me/cart", requireUser, async (req, res, next) => {
    try {
        const cart = await prisma.cartItem.create({
           data: {
                quantity,
                productId,
                cartId: user.cart.id
            }
        });
        res.send(cart);
    } catch (error) {
        next(error);
    }
});

// update cart 
usersRouter.put("/me/cart/:id", async (req, res, next) => {
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
} );



module.exports = usersRouter;