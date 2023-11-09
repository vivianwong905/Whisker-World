// TODO: add API router here and all API sub-routers

// api/index.js
const express = require('express');
const apiRouter = express.Router();

const jwt = require('jsonwebtoken');
const prisma = require('../db/client');
const { JWT_SECRET } = process.env;



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

