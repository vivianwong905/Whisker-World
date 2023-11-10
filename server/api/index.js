
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

apiRouter.use((error, req, res, next) => {
    res.send(error);
});

module.exports = apiRouter;

