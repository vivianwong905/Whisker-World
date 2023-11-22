//make an api end point that deletes all the items in the cart
//reference cart item delete user.js line 100
// find many in the cart and delete them all

const checkoutRouter = require("express").Router();
const { requireUser } = require("../auth/middleware");
const prisma = require("../db/client");

//this is a post because eventually we will want to do more than delete
checkoutRouter.post("/:id", requireUser, async (req, res, next) => {
    try {
        const { id } = req.params;
        const cartToCheckout = await prisma.cart.findFirst({
            where: { user: { id: req.user.id } },
            include: {
                user: true,
                cartItems: {
                    include: { product: true }
                }
            }
        });

        if (cartToCheckout.user.id === req.user.id) {
            const cartItem = await prisma.cartItem.deleteMany({
                where: { cartId: cartToCheckout.id },
            });
            res.send(cartItem); 
        } else {
            next({
                name: 'UnauthorizedUserError',
                message: 'You cannot checkout a cart that is not yours'
            })
        }
    } catch (error) {
        console.error(error)
        next(error);
    }
});

module.exports = checkoutRouter;