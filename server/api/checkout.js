//make an api end point that deletes all the items in the cart
//reference cart item delete user.js line 100
// find many in the cart and delete them all

const checkoutRouter = require("express").Router();
const { requireUser } = require("../auth/middleware");
const prisma = require("../db/client");

checkoutRouter.delete("/:id", requireUser, async(req, res, next) => {
    try {
        const { id } = req.params;
        const cartToCheckout = await prisma.cart.findFirst({
            where: { user: { id: req.user.id } },
            include: {
                cartItems: {
                    include: { product: true }
                }
            }
        });

        if (cartToCheckout.id === req.user.id) {
            const cartItem = await prisma.cartItem.deleteMany({
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
        } else {
            next({
                name: 'UnauthorizedUserError',
                message: 'You cannot checkout a cart that is not yours'
            })
        }
    } catch (error) {
        next(error);
    }
});

module.exports = checkoutRouter;