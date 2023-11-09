const prisma = require("../db/client");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = process.env;

function requireUser(req, res, next) {
    if (!req.user) {
      res.status(401);
      next({
        name: "MissingUserError",
        message: "You must be logged in to preform this action"
      });
    }
  
    next();
  }

  function requireAdmin(req, res, next) {
    if (!req.user.admin) {
      res.status(403);
      next({
        name: "MissingAdminError",
        message: "You must be an admin to preform this action"
      });
    }
  
    next();
  }
  
  const verifyAuthToken = async (req, res, next) => {
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
}

  
  module.exports = {
    requireUser,
    requireAdmin,
    verifyAuthToken
  }