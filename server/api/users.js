const usersRouter = require("express").Router();
const { requireUser } = require("../auth/middleware");
const prisma = require("../db/client");

// Get all users items in cart
usersRouter.get("/me/cart", requireUser, async (req, res, next) => {
    try {
        const cart = await prisma.cart.findFirst({
            where: { user: { id: req.user.id } },
            include: {
                cartItems: {
                    include: { product: true }
                }
            }
        });
        res.send(cart);
    } catch (error) {
        console.error(error)
        next(error);
    }
});

// post - add an product to my cart
usersRouter.post("/me/cart/items", requireUser, async (req, res, next) => {
    try {
        const { quantity, productId } = req.body
        const cart = await prisma.cart.findFirstOrThrow({
            where: { user: { id: req.user.id } },
            include: {
                cartItems: {
                    include: { product: true }
                }
            }
        });
        const cartItem = await prisma.cartItem.create({
            data: {
                quantity: quantity,
                productId: productId,
                cartId: cart.id
            },
            include: {
                cart: {
                    include: {
                        cartItems: {
                            include: { product: true }
                        }
                    }
                }
            }
        });
        res.send(cartItem.cart);
    } catch (error) {
        next(error);
    }
});

// update cart 
usersRouter.patch("/me/cart/items/:id", requireUser, async (req, res, next) => {
    try {
        const { quantity } = req.body;
        const { id } = req.params;
        //TODO : check that this users has permisson to update this cart item look up cart item by id
        //and confirm this cartitem is in a cart that belongs to this user
        //prisma find cartITem that is attached to this users cart 
        const cartItem = await prisma.cartItem.update({
            where: { id: Number(id) },
            data: {
                quantity: quantity
            },
            include: {
                cart: {
                    include: {
                        cartItems: {
                            include: { product: true }
                        }
                    }
                }
            }
        });
        res.send(cartItem.cart); //or cartitem down the line
    } catch (error) {
        console.error(error)
        next(error);
    }
});

// Delete an item from the cart
usersRouter.delete("/me/cart/items/:id", requireUser, async (req, res, next) => {
    try {
        const { quantity } = req.body;
        const { id } = req.params;
        //TODO:  check that this users has permisson to delete this cart item look up cart item by id
        //and confirm this cartitem is in a cart that belongs to this user
        //prisma find cartITem that is attached to this users cart 
        const cartItem = await prisma.cartItem.delete({
            where: { id: Number(id) },
            data: {
                quantity: quantity
            },
            include: {
                cart: {
                    include: {
                        cartItems: {
                            include: { product: true }
                        }
                    }
                }
            }
        });
        res.send(cartItem.cart); //or cartitem down the line
    } catch (error) {
        next(error);
    }
});

module.exports = usersRouter;