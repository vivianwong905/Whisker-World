
// api/index.js
const express = require('express');
const apiRouter = express.Router();

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

const checkoutRouter = require('./checkout')
apiRouter.use('/checkout', checkoutRouter);

apiRouter.use((error, req, res, next) => {
    res.send(error);
});

apiRouter.get('*', (req, res) => {
    res.status(404).send({
        error: '404 - Not Found',
        message: 'No route found for the requested URL',
    });
});

module.exports = apiRouter;

