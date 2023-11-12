const usersRouter = require("express").Router();
const { requireUser } = require("../auth/middleware");
const prisma = require("../db/client");

// Get all users items in cart
usersRouter.get("/me/cart", requireUser, async (req, res, next) => {
    try {
        const cart = await prisma.cart.findUnique({
            where: { id: req.user.id }, include: { cartItems: { include: { product: true } } }
        });
        res.send(cart);
    } catch (error) {
        next(error);
    }
});

// post - add an product to my cart
usersRouter.post("/me/cart", requireUser, async (req, res, next) => {
    try {
        const {quantity, productId} = req.body
        const cart = await prisma.cartItem.create({
            data: {
                quantity : quantity,
                productId : productId,
                cartId: user.cart.id
            },
            include: { product: true }
        });
        res.send(cart);
    } catch (error) {
        next(error);
    }
});

// update cart 
usersRouter.put("/me/cart/:id", requireUser, async (req, res, next) => {
    try {
        const { quantity, productId } = req.body
        const cart = await prisma.cart.update({
            where: { id: req.user.cart.id },
            data: {
                user: req.user.id,
                cartItems: {
                    create: {
                        quantity: quantity,
                        productId: productId
                    },
                    include: { product: true }
                },
                include: { cartItems: true }
            }
        });
        res.send(cart);
    } catch (error) {
        next(error);
    }
});

// Delete an item from the cart
usersRouter.delete("/me/cart/:id", requireUser, async (req, res, next) => {
    try {
        const { quantity, productId } = req.body
        const cart = await prisma.cartItem.delete({
            where: { id: req.user.cart.id },
            data: {
                quantity: quantity,
                productId: productId,
                cartId: user.cart.id
            },
            include: { product: true }
        });
        res.send(cart);
    } catch (error) {
        next(error);
    }
});

module.exports = usersRouter;