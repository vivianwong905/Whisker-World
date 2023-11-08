// TODO: add API router here and all API sub-routers

// api/index.js
const express = require('express');
const apiRouter = express.Router();

const jwt = require('jsonwebtoken');
const prisma = require('../db/client');
const { JWT_SECRET } = process.env;

// set `req.user` if possible
apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) {
        // nothing to see here
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);

        try {
            const { id } = jwt.verify(token, JWT_SECRET);

            if (id) {
                req.user = await prisma.user.findUnique({ where: { id: id } });
                next();
            } else {
                next({
                    name: 'AuthorizationHeaderError',
                    message: 'Authorization token malformed',
                });
            }
        } catch ({ name, message }) {
            next({ name, message });
        }
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${prefix}`,
        });
    }
});

apiRouter.use((req, res, next) => {
    if (req.user) {
        console.log('User is set:', req.user);
    }

    next();
});

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const cartRouter = require('./cart');
apiRouter.use('/cart', cartRouter);

apiRouter.use((error, req, res, next) => {
    res.send(error);
});

module.exports = apiRouter;

